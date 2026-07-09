'use client';

import { type GoApiResponse } from '@/types/api.types';
import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { useMemo } from 'react';

/* * */

type AgencyId = number | string;

interface DataWithAgencyId {
	agency_id?: AgencyId
}

interface UseFilterByAgencyIdsOptions<T> {
	agencyIds?: readonly AgencyId[]
	getAgencyIds?: (item: T) => AgencyId | AgencyId[] | null | undefined
}

/* * */

export function useFilterByAgencyIds<T>(response?: GoApiResponse<T[]>, options: UseFilterByAgencyIdsOptions<T> = {}): GoApiResponse<T[]> {
	const agencyIds = options.agencyIds || CARRIS_METROPOLITANA_AGENCY_IDS;
	const getAgencyIds = options.getAgencyIds;

	return useMemo(() => {
		const allowedAgencyIds = new Set(agencyIds.map(String));

		const filteredData = (response?.data || []).filter((item) => {
			const itemAgencyIds = getAgencyIds ? getAgencyIds(item) : (item as DataWithAgencyId).agency_id;
			const normalizedItemAgencyIds = Array.isArray(itemAgencyIds) ? itemAgencyIds : [itemAgencyIds];
			return normalizedItemAgencyIds.some(itemAgencyId => itemAgencyId !== undefined && itemAgencyId !== null && allowedAgencyIds.has(String(itemAgencyId)));
		});

		return {
			data: filteredData,
			error: response?.error || '',
			status_code: response?.status_code || '',
		};
	}, [response, agencyIds, getAgencyIds]);
}
