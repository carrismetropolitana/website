import ukkonen from 'ukkonen';
// Faster levenshtein distance

type SearchType<T> = {
	[K in keyof T]: T[K] extends string ? string : T[K];
} & {
	[key: string]: unknown
	boost?: boolean
};
type KeyWithStringValue<T> = {
	[K in keyof T]: T[K] extends string | string[] ? K : never;
}[keyof T];
function normalizeString(str: string): string {
	const res = str.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9 ]/g, '');
	return res;
};

export function createDocCollection<T extends SearchType<T>>(docs: T[], scoring: { [K in KeyWithStringValue<T>]?: number }) {
	const cachedDocs = docs.map((doc: T) => {
		const normalizedDoc = {} as { [K in KeyWithStringValue<T>]: string | string[] };
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

	const levCache = new Map<string, number>();
	return {
		search: (query: string) => searchDocuments(query, cachedDocs, scoring, levCache),
	};
}

/**
 * Search documents based on a query using prefix matching and fuzzy search.
 * @param query - The search query.
 * @param docs - Array of documents to search through. Each document should have 'primary' and 'secondary' fields.
 * @returns  - Filtered and sorted documents based on relevance to the query.
 */
function searchDocuments<T extends SearchType<T>>(query: string, docs: {
	doc: T
	normalized: {
		[K in KeyWithStringValue<T>]: string | string[]
	}
}[],
scoring: { [K in KeyWithStringValue<T>]?: number },
levCache: Map<string, number>): T[] {
	/**
     * Normalize a string by converting to lowercase, removing accents, and non-alphanumeric characters.
     * @param {string} str - The string to normalize.
     * @returns {string} - The normalized string.
     */

	/**
     * Check if a word starts with a given prefix.
     * @param {string} word - The word to check.
     * @param {string} prefix - The prefix to match.
     * @returns {boolean} - True if the word starts with the prefix, false otherwise.
     */
	let cumPrefixTime = 0;
	const isPrefixMatch = (word: string, prefix: string): boolean => {
		const start = Date.now();
		const res = word.startsWith(prefix);
		cumPrefixTime += Date.now() - start;
		return res;
	};

	let cumLevTime = 0;
	/**
	   * Calculate the Levenshtein distance between two strings.
	   * @param a - The first string.
	   * @param b - The second string.
	   * @returns - The Levenshtein distance.
	   */
	const levenshteinDistance = (a: string, b: string, maxDistance: number): number => {
		const start = Date.now();
		const cachekey = a + '\n' + b;
		const cacheValue = levCache.get(cachekey);
		if (cacheValue !== undefined) {
			return cacheValue;
		}
		const res = ukkonen(a, b, maxDistance);
		levCache.set(cachekey, res);
		cumLevTime += Date.now() - start;
		return res;
		// const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
		// for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

		// for (let i = 1; i <= b.length; i++) {
		// 	for (let j = 1; j <= a.length; j++) {
		// 		if (b.charAt(i - 1) === a.charAt(j - 1)) {
		// 			matrix[i][j] = matrix[i - 1][j - 1];
		// 		}
		// 		else {
		// 			matrix[i][j] = Math.min(
		// 				matrix[i - 1][j - 1] + 1, // substitution
		// 				matrix[i][j - 1] + 1, // insertion
		// 				matrix[i - 1][j] + 1, // deletion
		// 			);
		// 		}
		// 	}
		// }

		// cumLevTime += Date.now() - start;
		// return matrix[b.length][a.length];
	};

	/**
     * Calculate the context score for a text based on the query words.
     * @param {string} text - The text to score.
     * @param {Array<string>} queryWords - The query words to match.
     * @returns {number} - The context score.
     */
	const getContextScore = (text: string, queryWords: string[]): number => {
		const textWords = normalizeString(text).split(' ');
		let contextScore = 0;

		for (let i = 0; i <= textWords.length - queryWords.length; i++) {
			if (queryWords.every((qw: string, j: number) => isPrefixMatch(textWords[i + j], qw))) {
				contextScore++;
			}
		}

		return contextScore;
	};

	/**
     * Calculate the relevance score for a document based on the query words.
     * @param doc - The document to score.
     * @param queryWords - The query words to match.
     * @returns - The relevance score.
     */
	function calculateScore<T>(doc: T, boost: boolean | undefined, queryWords: string[], scoring: { [k in KeyWithStringValue<T>]?: number }): number {
		let score = 0;

		// The algorithm implements a prefix search per word,
		// followed by a fuzzy search if the prefix search is not successful

		function matchWord(wordList: string[], queryWord: string) {
			let matchScore = 0;
			const maxLevDistance = Math.max(2, Math.ceil(0.3 * queryWord.length));
			// fuzzy search tolerance increases very slightly with query word length

			wordList.forEach((word: string) => {
				if (isPrefixMatch(word, queryWord)) {
					matchScore += 1;
				}
				else if (queryWord.length > 2 && word.length >= 2 && levenshteinDistance(word, queryWord, maxLevDistance) < maxLevDistance) {
					matchScore += 0.5;
				}
			});

			return matchScore;
		};
		for (const untypedKey in scoring) {
			const key = untypedKey as KeyWithStringValue<T>;
			const value = doc[key];
			if (Array.isArray(value)) {
				const words = value;
				const multiplier = scoring[key] ?? 1;

				score += Math.max(...queryWords.map((queryWord: string) => {
					let localScore = 0;
					localScore += matchWord(words, queryWord);
					localScore += getContextScore(value.join(' '), queryWords);
					return localScore;
				})) * multiplier;
			}
			else if (typeof value === 'string') {
				const words = value.split(' ');
				const multiplier = scoring[key] ?? 1;

				queryWords.forEach((queryWord: string) => {
					score += matchWord(words, queryWord) * multiplier;
				});

				if (queryWords.length > 1) {
					score += getContextScore(value, queryWords) * multiplier;
				}
			}
		}

		// For the query, it matches primary string first,
		// then the secondary string the same way

		if (boost) {
			score *= 1.5;
		}

		return score;
	};

	const queryWords = normalizeString(query)
		.split(' ')
		.filter((word: string) => word.length > 1 || (word.length === 1 && !Number.isNaN(word)));

	const scoredDocs = docs.map(doc => ({
		doc: doc.doc,
		score: calculateScore(doc.normalized, doc.doc.boost, queryWords, scoring),
	}));
	// console.log('Levenshtein time:', cumLevTime);

	return scoredDocs
		.filter(scoredDoc => scoredDoc.score > 0.5)
		.sort((a, b) => b.score - a.score)
		.map(scoredDoc => scoredDoc.doc);
}
