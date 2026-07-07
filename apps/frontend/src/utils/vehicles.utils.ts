/* * */

import { type HubVehicleMetadata } from '@/types/vehicles.types';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';

/* * */

// Converts a realtime position vehicle id (`[42]123`) into metadata vehicle id (`42-123`).
export function getMetadataVehicleIdFromPositionVehicleId(vehicleId: string): string {
	const match = vehicleId.match(/^\[(\d+)\](.+)$/);
	if (match) return `${match[1]}-${match[2]}`;
	return vehicleId;
}

export function buildVehicleMetadataMap(metadata: HubVehicleMetadata[] = []): Map<string, HubVehicleMetadata> {
	return new Map(metadata.map(item => [item.vehicle_id, item]));
}

export function getVehicleMetadataForPosition(position: HubVehiclePosition, metadataByVehicleId: Map<string, HubVehicleMetadata>): HubVehicleMetadata | undefined {
	return metadataByVehicleId.get(getMetadataVehicleIdFromPositionVehicleId(position.vehicle_id));
}
