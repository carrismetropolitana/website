'use client';

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubPattern } from '@tmlmobilidade/go-types-public-info';

/**
 * Fetch one or more patterns by their IDs in parallel.
 * @param patternIds The IDs of the patterns to fetch.
 * @returns An array of patterns.
 */
export async function fetchPatterns(patternIds: string[]): Promise<HubPattern[][]> {
	const fetchPromises = patternIds.map((patternId) => {
		return fetch(getPublicVariable('go_api_url') + '/hub/api/v1/network/patterns/' + patternId)
			.then(response => response.json())
			.then(data => data.data as HubPattern[]);
	});
	return await Promise.all(fetchPromises);
}
