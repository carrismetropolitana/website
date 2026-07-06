'use client';

import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { useMemo } from 'react';

/* * */

interface DataWithAgencyId {
	agency_id: number | string
}

/* * */

export function useFilterByAgencyIds<T extends DataWithAgencyId>(data: T[] = [], agencyIds: readonly string[] = CARRIS_METROPOLITANA_AGENCY_IDS) {
	return useMemo(() => {
		const allowedAgencyIds = new Set(agencyIds);
		return data.filter(item => allowedAgencyIds.has(String(item.agency_id)));
	}, [data, agencyIds]);
}
