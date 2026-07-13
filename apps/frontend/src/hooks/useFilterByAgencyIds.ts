'use client';

import { type GoApiResponse } from '@/types/api.types';
import { CARRIS_METROPOLITANA_AGENCY_IDS } from '@carrismetropolitana/website-shared-settings';
import { useMemo } from 'react';

/* * */

type AgencyId = number | string;

interface DataWithAgencyId {
	agency_id?: AgencyId
}

interface DataWithLineFields {
	_id?: number | string
	line_id?: string
	line_ids?: string[]
	short_name?: string
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
		const normalizeLineId = (lineId: string) => lineId.replace(/^\[[^\]]+\]/, '');

		const filteredData = (response?.data || []).filter((item) => {
			const itemAgencyIds = getAgencyIds ? getAgencyIds(item) : (item as DataWithAgencyId).agency_id;
			const normalizedItemAgencyIds = Array.isArray(itemAgencyIds) ? itemAgencyIds : [itemAgencyIds];
			return normalizedItemAgencyIds.some(itemAgencyId => itemAgencyId !== undefined && itemAgencyId !== null && allowedAgencyIds.has(String(itemAgencyId)));
		}).map((item) => {
			const itemWithLineFields = item as DataWithAgencyId & DataWithLineFields & T;
			const isLineData = typeof itemWithLineFields._id === 'string' && itemWithLineFields.agency_id && !itemWithLineFields.line_id;
			const normalizedLineId = itemWithLineFields.line_id ? normalizeLineId(itemWithLineFields.line_id) : undefined;
			const normalizedLineIds = itemWithLineFields.line_ids?.map(normalizeLineId);
			const normalizedLineDataId = isLineData ? normalizeLineId(String(itemWithLineFields._id)) : undefined;
			const normalizedShortName = isLineData && itemWithLineFields.short_name ? normalizeLineId(itemWithLineFields.short_name) : undefined;

			if (!normalizedLineDataId && !normalizedLineId && !normalizedLineIds && !normalizedShortName) return item;

			return {
				...item,
				...(normalizedLineDataId && { _id: normalizedLineDataId }),
				...(normalizedLineId && { line_id: normalizedLineId }),
				...(normalizedLineIds && { line_ids: normalizedLineIds }),
				...(normalizedShortName && { short_name: normalizedShortName }),
			};
		});

		return {
			data: filteredData,
			error: response?.error || '',
			status_code: response?.status_code || '',
		};
	}, [response, agencyIds, getAgencyIds]);
}
