'use client';

/* * */

import { type HubVehicleMetadata } from '@/types/vehicles.types';
import { CARRIS_METROPOLITANA_NUMERIC_AGENCY_IDS, getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

/* * */

type HubVehicleMetadataResponse = HubVehicleMetadata[] | { data?: HubVehicleMetadata[] | null };

const VEHICLE_ID_WITH_AGENCY_REGEX = /^\[([^\]]+)\](.+)$/;

function getVehicleMetadataLookupId(vehicleId: string): string {
	const match = vehicleId.match(VEHICLE_ID_WITH_AGENCY_REGEX);
	if (!match) return vehicleId;

	const [, agencyId, vehicleNumber] = match;
	const metadataAgencyId = CARRIS_METROPOLITANA_NUMERIC_AGENCY_IDS[agencyId] ?? agencyId;
	return `${metadataAgencyId}-${vehicleNumber}`;
}

/* * */

export function useVehicleMetadata() {
	//

	//
	// A. Fetch data

	const { data: metadataResponse, isLoading } = useSWR<HubVehicleMetadataResponse>(`${getPublicVariable('go_api_url')}/hub/api/v1/realtime/vehicles/metadata`, { refreshInterval: 900_000 }); // 15 minutes

	//
	// B. Transform data

	const metadata = useMemo(() => {
		if (Array.isArray(metadataResponse)) return metadataResponse;
		return metadataResponse?.data ?? [];
	}, [metadataResponse]);

	const metadataByVehicleId = useMemo(() => {
		return new Map(metadata.map(item => [item.vehicle_id, item]));
	}, [metadata]);

	//
	// C. Handle actions

	const getMetadataForVehicleId = useCallback((vehicleId: null | string | undefined): HubVehicleMetadata | undefined => {
		if (!vehicleId) return;
		return metadataByVehicleId.get(getVehicleMetadataLookupId(vehicleId));
	}, [metadataByVehicleId]);

	//
	// D. Return state

	return {
		actions: {
			getMetadataForVehicleId,
		},
		data: {
			metadata,
			metadataByVehicleId,
		},
		flags: {
			isLoading,
		},
	};

	//
}
