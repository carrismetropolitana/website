/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type GoApiResponse } from '@carrismetropolitana/website-shared-types';
import { type HubV1ApiLine, type HubV1ApiStop } from '@tmlmobilidade/go-types-hub';

/* * */

/**
 * Server-side helpers to fetch single entities from the GO API.
 * These are used by generateMetadata, opengraph-image and similar
 * server routes. They must never download full collections, since
 * that runs once per request and overwhelms the frontend server.
 * Responses are small, so they fit in the Next.js data cache and are
 * shared across requests for REVALIDATE_SECONDS.
 */

const REVALIDATE_SECONDS = 3600;

async function fetchGoApiEntity<T>(path: string): Promise<null | T> {
	try {
		const response = await fetch(`${getPublicVariable('go_api_url')}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
		if (!response.ok) return null;
		const result: GoApiResponse<T> = await response.json();
		return result?.data ?? null;
	}
	catch {
		return null;
	}
}

export function fetchGoStop(stopId: string): Promise<HubV1ApiStop | null> {
	return fetchGoApiEntity<HubV1ApiStop>(`/hub/api/v1/network/stops/${encodeURIComponent(stopId)}`);
}

export function fetchGoLine(lineId: string): Promise<HubV1ApiLine | null> {
	return fetchGoApiEntity<HubV1ApiLine>(`/hub/api/v1/network/lines/${encodeURIComponent(lineId)}`);
}

/**
 * Fetch several lines in parallel, dropping the ones that fail,
 * and return them sorted by their id.
 */
export async function fetchGoLines(lineIds: string[]): Promise<HubV1ApiLine[]> {
	const results = await Promise.all(lineIds.map(lineId => fetchGoLine(lineId)));
	return results
		.filter((line): line is HubV1ApiLine => line !== null)
		.sort((a, b) => a._id.localeCompare(b._id));
}
