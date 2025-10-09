'use client';

/* * */

import ukkonen from 'ukkonen'; // Faster levenshtein distance

/* * */

export type SearchableDocument<T> = {
	[key: string]: unknown
	boost?: boolean
} & {
	[K in keyof T]: T[K] extends string ? string : T[K];
};

type KeyWithStringOrStringArrayValue<T> = {
	[K in keyof T]: T[K] extends string | string[] ? K : never;
}[keyof T];

interface Options {
	/**
	 * The multiplier to apply to the score of boosted documents.
	 */
	boostMultiplier?: number
	/**
	 * The minimum length of a query word to be considered in the search. Ignored when query is a number.
	 */
	minimumQueryLength?: number
	/**
	 * The portion of top results to show.
	 * Lower values will show less results, higher values will show more results.
	 * Threshold should be greater than 1.
	 * @default 2
	 * */
	threshold?: number
	/**
	 * Whether to use Levenshtein distance to match words that are close but not exact.
	 * Useful for typos and other small errors.
	 * Can be disabled for map searches where the user might want to search for exact matches only.
	 * @default true
	 * */
	useLevenshtein?: boolean
};

interface FinalOptions {
	boostMultiplier: number
	minimumQueryLength: number
	threshold: number
	useLevenshtein: boolean
};
/* * */

/**
 * Normalize a string by converting to lowercase, removing accents, and non-alphanumeric characters.
 * @param str - The string to normalize.
 * @returns The normalized string.
 */
function normalizeString(str: string): string {
	const res = str.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9 ]/g, '');
	return res;
};

/**
 *
 * @param docs Array of documents to search through, documents with a true 'boost' key will have their score multiplied by the boostMultiplier.
 * This is useful for prioritizing certain documents.
 * @param scoring Object with the keys of the documents to search through and the weight of the search on each key.
 * @param options Options for the search.
 * @returns
 */
export function createDocCollection<T extends SearchableDocument<T>>(docs: T[], scoring: Partial<Record<KeyWithStringOrStringArrayValue<T>, number>>, options: Options = {}) {
	const defaultOptions = {
		boostMultiplier: 1.5,
		minimumQueryLength: 1,
		threshold: 2,
		useLevenshtein: true,
	};

	const finalOptions: FinalOptions = {
		...defaultOptions,
		...options,
	};

	const normalizedDocs = docs.map((doc: T) => {
		const normalizedDoc = {} as Record<KeyWithStringOrStringArrayValue<T>, string | string[]>;
		for (const key in scoring) {
			const v = doc[key];
			if (typeof v === 'string') {
				normalizedDoc[key] = normalizeString(v);
			}
			else if (Array.isArray(v)) {
				normalizedDoc[key] = (v as string[]).filter(v => v != null).map(normalizeString);
			}
		}
		return { doc, normalized: normalizedDoc };
	});

	const levenshteinCache = new Map<string, number>();
	return {
		search: (query: string) => searchDocuments(query, normalizedDocs, scoring, levenshteinCache, finalOptions),
	};
}

/**
 * Calculate the Levenshtein distance between two strings, using a cache to speed up the process.
 * @param a - The first string.
 * @param b - The second string.
 * @param maxDistance - The maximum distance allowed. Stops early which significantly speeds up the process.
 * @param levenshteinCache - The cache to store the results.
 * @returns - The Levenshtein distance.
 */
const levenshteinDistance = (a: string, b: string, maxDistance: number, levenshteinCache: Map<string, number>): number => {
	const cachekey = a + '\n' + b;
	const cacheValue = levenshteinCache.get(cachekey);
	if (cacheValue !== undefined) {
		return cacheValue;
	}
	const res = ukkonen(a, b, maxDistance);
	levenshteinCache.set(cachekey, res);
	return res;
};

/**
 * Calculate the score for a string, based on the number of consecutive query words that prefix match.
 * "The quick brown fox" has a score of 1 for "quick brown" and 0 for "quick fox".
 * @param text The text to score.
 * @param queryWords The query words to match.
 * @returns The context score.
 */
const sequentialWordsMatchScore = (text: string, queryWords: string[]): number => {
	const textWords = text.split(' ');
	let contextScore = 0;

	for (let i = 0; i <= textWords.length - queryWords.length; i++) {
		if (queryWords.every((qw: string, j: number) => isPrefixMatch(textWords[i + j], qw))) {
			contextScore++;
		}
	}

	return contextScore;
};

/**
 * Check if a word starts with a given prefix.
 * @param word The word to check.
 * @param prefix The prefix to match.
 * @returns True if the word starts with the prefix, false otherwise.
 */
const isPrefixMatch = (word: string, prefix: string): boolean => {
	const res = word.startsWith(prefix);
	return res;
};

/**
 * Search documents based on a query using prefix matching and fuzzy search.
 * @param query - The search query.
 * @param docs - Array of documents to search through. Each document should have 'primary' and 'secondary' fields.
 * @returns Filtered and sorted documents based on relevance to the query.
 */
function searchDocuments<T extends SearchableDocument<T>>(
	query: string, docs: {
		doc: T
		normalized: Record<KeyWithStringOrStringArrayValue<T>, string | string[]>
	}[],
	scoreWeights: Partial<Record<KeyWithStringOrStringArrayValue<T>, number>>,
	levenshteinCache: Map<string, number>,
	options: FinalOptions,
): T[] {
	/**
     * Calculate the relevance score for a document based on the query words.
     * @param doc - The document to score.
     * @param queryWords - The query words to match.
     * @returns - The relevance score.
     */
	const calculateScore = <T>(doc: T, boost: boolean | undefined, queryWords: string[], scoring: Partial<Record<KeyWithStringOrStringArrayValue<T>, number>>): number => {
		let totalScore = 0;

		// The algorithm implements a prefix search per word,
		// followed by a fuzzy search if the prefix search is not successful

		const matchWord = (documentSearchedWords: string[], queryWord: string) => {
			// fuzzy search tolerance increases very slightly with query word length
			const maxLevDistance = Math.max(options.minimumQueryLength, Math.ceil(0.3 * queryWord.length));

			const documentWordScores = documentSearchedWords.map((word: string) => {
				// If the word is a prefix match, match, else fuzzy search and give lower score
				if (isPrefixMatch(word, queryWord)) {
					return 1;
				}
				// Check if the query is of enough size to be searched
				else if (options.useLevenshtein === true && queryWord.length > options.minimumQueryLength && word.length > options.minimumQueryLength) {
					// If the query is a number, we don't want to do a fuzzy search
					if (Number.isNaN(Number(queryWord)) && levenshteinDistance(word, queryWord, maxLevDistance, levenshteinCache) < maxLevDistance) {
						return 0.5;
					}
				}
				return 0;
			});

			return Math.max(...documentWordScores);
		};

		// Calculate the score for each field in the document
		for (const untypedKey in scoring) {
			// Typescript magic for assuring the key is actually one of our keys
			const key = untypedKey as KeyWithStringOrStringArrayValue<T>;
			const documentValue = doc[key];
			const multiplier = scoring[key] ?? 1;

			// If the value is an array, we treat it as a list of words
			if (Array.isArray(documentValue)) {
				if (documentValue.length === 0) {
					continue;
				}
				const documentStrings = documentValue;
				if (queryWords.length > 0) {
					// Match each query word against a locality.
					// We do not match against each word in the locality as this would be very slow. TODO improve
					queryWords.forEach((queryWord: string) => {
						// The length penalty is a factor that decreases the score
						// of a word match based on the length of the query word.
						// This is to prevent short words from being too heavily weighted.
						// The penalty is a factor of the length of the query word divided by 4
						// The penalty is then clamped between 0 and 1.
						const lengthPenalty = Math.min(queryWord.length / 4, 1);
						totalScore += matchWord(documentStrings, queryWord) * multiplier * lengthPenalty;
					});
				}
			}
			else if (typeof documentValue === 'string') {
				const documentWords = documentValue.split(' ');
				queryWords.forEach((queryWord: string) => {
					// See above
					const lengthPenalty = Math.min(queryWord.length / 4, 1);
					totalScore += matchWord(documentWords, queryWord) * multiplier * lengthPenalty;
				});

				if (queryWords.length > 1) {
					totalScore += sequentialWordsMatchScore(documentValue, queryWords) * multiplier;
				}
			}
		}

		// For the query, it matches primary string first,
		// then the secondary string the same way

		if (boost) {
			totalScore *= options.boostMultiplier;
		}

		return totalScore;
	};

	// Normalize query and split into words, filtering out words that are too short and that are not numbers
	const queryWords = normalizeString(query)
		.split(' ')
		.filter((word: string) => word.length > 0 && (word.length >= options.minimumQueryLength || !Number.isNaN(Number(word))));

	// Calculate the score for each document, using the normalized string
	const scoredDocs = docs.map(doc => ({
		doc: doc.doc,
		score: calculateScore<typeof doc.normalized>(doc.normalized, doc.doc.boost, queryWords, scoreWeights),
	}));

	// Sort the documents by score
	const sortedScoreDocs = scoredDocs.sort((a, b) => b.score - a.score);

	// Filter out documents with a score less than half of the top score
	const bestScore = sortedScoreDocs[0]?.score;
	const filteredScoreDocs = sortedScoreDocs.filter(scoredDoc => scoredDoc.score > Math.floor(bestScore / options.threshold) || bestScore === 0);

	// If top score is 0, we filter out all documents
	if (bestScore === 0) {
		return [];
	}

	// Sort the documents by score and
	return filteredScoreDocs.map(scoredDoc => scoredDoc.doc);

	//
}
