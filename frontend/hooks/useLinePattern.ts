import { Pattern, PatternGroup } from '@/types/lines.types';
import { useState } from 'react';

export interface UseLinePatterns {
	error: boolean
	fetchPatterns: (pattern_ids: string[]) => void
	loading: boolean
	patterns: null | PatternGroup[]
}

const useLinePatterns = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [patterns, setPatterns] = useState<null | PatternGroup[]>(null);

	const fetchPatterns = async (pattern_ids: string[]) => {
		setError(false);
		setPatterns(null);

		if (pattern_ids.length <= 0) return;

		setLoading(true);

		try {
			const fetchPromises = pattern_ids.map(patternId =>
				fetch(`https://api.carrismetropolitana.pt/v2/patterns/${patternId}`).then(response => response.json()),
			);
			const resultData: Pattern[] = await Promise.all(fetchPromises);

			// Map the data to the correct format
			const groups: PatternGroup[] = [];
			resultData.map((pattern: Pattern) => {
				pattern.map((group: PatternGroup) => {
					console.log('Group:', group);
					groups.push(group);
				});
			});

			setPatterns(groups);
		}
		catch (error) {
			console.error('Error fetching pattern data:', error);
			setError(true);
		}
		finally {
			setLoading(false);
		}
	};

	return {
		error,
		fetchPatterns,
		loading,
		patterns,
	} as UseLinePatterns;
};

export default useLinePatterns;
