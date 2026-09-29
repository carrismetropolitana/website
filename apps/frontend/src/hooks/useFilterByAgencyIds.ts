'use client';

import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { type HubV1ApiLine, type HubV1ApiRoute, type HubV1ApiStop } from '@tmlmobilidade/go-types-hub';
import { ApiResponse } from '@tmlmobilidade/go-types-shared';
import { useMemo } from 'react';

/* * */

type AgencyId = HubV1ApiLine['agency_id'] | HubV1ApiStop['agency_ids'][number];
type FilterDataType = 'line' | 'route' | 'stop';

interface UseFilterByAgencyIdsOptions<T> {
	agencyIds?: readonly AgencyId[]
	dataType?: FilterDataType
	getAgencyIds?: (item: T) => AgencyId | AgencyId[] | null | undefined
}

/* * */

export function useFilterByAgencyIds<T>(response?: ApiResponse<T[]>, options: UseFilterByAgencyIdsOptions<T> = {}): T[] {
	const agencyIds = options.agencyIds || CARRIS_METROPOLITANA_AGENCY_IDS;
	const dataType = options.dataType;
	const getAgencyIds = options.getAgencyIds;

	return useMemo(() => {
		const allowedAgencyIds = new Set(agencyIds.map(String));
		const normalizeLineId = (lineId: string) => lineId.replace(/^\[[^\]]+\]/, '');
		const normalizeData = (item: T): T => {
			switch (dataType) {
				case 'line': {
					const lineData = item as Pick<HubV1ApiLine, '_id' | 'short_name'> & T;
					return {
						...item,
						_id: normalizeLineId(lineData._id),
						short_name: normalizeLineId(lineData.short_name),
					};
				}

				case 'route': {
					const routeData = item as Pick<HubV1ApiRoute, 'line_id'> & T;
					if (!routeData.line_id) return item;
					return {
						...item,
						line_id: normalizeLineId(routeData.line_id),
					};
				}

				case 'stop': {
					const stopData = item as Pick<HubV1ApiStop, 'line_ids'> & T;
					if (!stopData.line_ids) return item;
					return {
						...item,
						line_ids: stopData.line_ids.map(normalizeLineId),
					};
				}

				default:
					return item;
			}
		};

		const filteredData = (response?.data || []).filter((item) => {
			const itemAgencyIds = getAgencyIds ? getAgencyIds(item) : (item as Partial<Pick<HubV1ApiLine, 'agency_id'>>).agency_id;
			const normalizedItemAgencyIds = Array.isArray(itemAgencyIds) ? itemAgencyIds : [itemAgencyIds];
			return normalizedItemAgencyIds.some(itemAgencyId => itemAgencyId !== undefined && itemAgencyId !== null && allowedAgencyIds.has(String(itemAgencyId)));
		}).map(normalizeData);

		return filteredData;
	}, [response, agencyIds, dataType, getAgencyIds]);
}
