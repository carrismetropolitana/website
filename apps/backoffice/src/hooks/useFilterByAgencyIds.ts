'use client';

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { type HubLine } from '@tmlmobilidade/go-types-public-info';
import { useMemo } from 'react';

/* * */

type AgencyId = HubLine['agency_id'];
type FilterDataType = 'line';

interface UseFilterByAgencyIdsOptions<T> {
	agencyIds?: readonly AgencyId[]
	dataType?: FilterDataType
	getAgencyIds?: (item: T) => AgencyId | AgencyId[] | null | undefined
}

/* * */

export function useFilterByAgencyIds<T>(response?: GoApiResponse<T[]>, options: UseFilterByAgencyIdsOptions<T> = {}): GoApiResponse<T[]> {
	const agencyIds = options.agencyIds || CARRIS_METROPOLITANA_AGENCY_IDS;
	const dataType = options.dataType;
	const getAgencyIds = options.getAgencyIds;

	return useMemo(() => {
		const allowedAgencyIds = new Set(agencyIds.map(String));
		const normalizeLineId = (lineId: string) => lineId.replace(/^\[[^\]]+\]/, '');
		const normalizeData = (item: T): T => {
			switch (dataType) {
				case 'line': {
					const lineData = item as Pick<HubLine, '_id' | 'short_name'> & T;
					return {
						...item,
						_id: normalizeLineId(lineData._id),
						short_name: normalizeLineId(lineData.short_name),
					};
				}

				default:
					return item;
			}
		};

		const filteredData = (response?.data || []).filter((item) => {
			const itemAgencyIds = getAgencyIds ? getAgencyIds(item) : (item as Partial<Pick<HubLine, 'agency_id'>>).agency_id;
			const normalizedItemAgencyIds = Array.isArray(itemAgencyIds) ? itemAgencyIds : [itemAgencyIds];
			return normalizedItemAgencyIds.some(itemAgencyId => itemAgencyId !== undefined && itemAgencyId !== null && allowedAgencyIds.has(String(itemAgencyId)));
		}).map(normalizeData);

		return {
			data: filteredData,
			error: response?.error || '',
			status_code: response?.status_code || '',
		};
	}, [response, agencyIds, dataType, getAgencyIds]);
}
