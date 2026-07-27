'use client';

import { GoApiResponse } from '@/types/go-api-types';
import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { type HubLine, type HubRoute, type HubStop } from '@tmlmobilidade/go-types-public-info';
import { useMemo } from 'react';
/* * */

type AgencyId = HubLine['agency_id'] | HubStop['agency_ids'][number];
type FilterDataType = 'line' | 'route' | 'stop';

interface UseFilterByAgencyIdsOptions<T> {
	agencyIds?: readonly AgencyId[]
	dataType?: FilterDataType
	getAgencyIds?: (item: T) => AgencyId | AgencyId[] | null | undefined
}

/* * */

export function getHubStopCode(stopData: HubStop): string {
	const normalizedStopData = stopData as HubStop & {
		flags?: { stop_id?: number | string }[]
	};
	return String(normalizedStopData.flags?.[0]?.stop_id ?? stopData._id);
}

export function useFilterByAgencyIds<T>(response?: GoApiResponse<T[]>, options: UseFilterByAgencyIdsOptions<T> = {}): GoApiResponse<T[]> {
	const dataType = options.dataType;
	const getAgencyIds = options.getAgencyIds;

	return useMemo(() => {
		const allowedAgencyIds = new Set(CARRIS_METROPOLITANA_AGENCY_IDS.map(String));
		const stopAgencyIdsByLinePrefix = new Map(CARRIS_METROPOLITANA_AGENCY_IDS.map(agencyId => [agencyId.slice(-1), agencyId]));
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

				case 'route': {
					const routeData = item as Pick<HubRoute, 'line_id'> & T;
					if (!routeData.line_id) return item;
					return {
						...item,
						line_id: normalizeLineId(routeData.line_id),
					};
				}

				case 'stop': {
					const stopData = item as Pick<HubStop, 'line_ids'> & T;
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
			const itemAgencyIds = getAgencyIds ? getAgencyIds(item) : (() => {
				if (dataType !== 'stop') return (item as Partial<Pick<HubLine, 'agency_id'>>).agency_id;
				const stopData = item as Partial<HubStop> & {
					agency_id?: string
					agency_ids?: string[]
					lines?: string[]
				};
				if (stopData.agency_ids?.length) return stopData.agency_ids;
				if (stopData.agency_id) return stopData.agency_id;

				const lineIds = stopData.line_ids || stopData.lines || [];
				return lineIds.flatMap((lineId) => {
					const lineIdWithoutAgency = lineId.replace(/^\[[^\]]+\]/, '');
					const agencyId = stopAgencyIdsByLinePrefix.get(lineIdWithoutAgency.at(0) ?? '');
					return agencyId ? [agencyId] : [];
				});
			})();
			const normalizedItemAgencyIds = Array.isArray(itemAgencyIds) ? itemAgencyIds : [itemAgencyIds];
			return normalizedItemAgencyIds.some(itemAgencyId => itemAgencyId !== undefined && itemAgencyId !== null && allowedAgencyIds.has(String(itemAgencyId)));
		}).map(normalizeData);

		return {
			data: filteredData,
			error: response?.error || '',
			status_code: response?.status_code || '',
		};
	}, [response, dataType, getAgencyIds]);
}
