'use client';

/* * */

import type { HubLine, HubStop } from '@tmlmobilidade/go-types-public-info';

import { LineBadge } from '@/components/lines/LineBadge';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { normalizeReferenceId } from '@/utils/alerts';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

/* * */

interface Props {
	lineId?: string
	routeId?: string
	stopId?: string
}

/* * */

export function AlertInformedEntity({ lineId, routeId, stopId }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const environmentContext = useEnvironmentContext();

	//
	// B. Transform data

	const lineData = useMemo<HubLine | undefined>(() => {
		if (lineId) return linesContext.actions.getLineDataById(lineId);
		if (!routeId) return;
		const normalizedRouteId = normalizeReferenceId(routeId);
		return linesContext.data.lines?.find(line => line.route_ids.some(itemId => normalizeReferenceId(itemId) === normalizedRouteId));
	}, [lineId, linesContext.actions, linesContext.data.lines, routeId]);

	const stopData = useMemo<HubStop | undefined>(() => {
		const normalizedStopId = normalizeReferenceId(stopId);
		return stopsContext.data.stops?.find(stop => normalizeReferenceId(stop._id) === normalizedStopId);
	}, [stopId, stopsContext.data.stops]);

	//
	// C. Handle actions

	const handleLineBadgeClick = () => {
		const lineHref = environmentContext.actions.getNormalizedHref(`/lines/${lineData?._id}`);
		router.push(lineHref);
	};

	//
	// D. Render components

	if (lineData) {
		return (
			<LineBadge lineData={lineData} onClick={handleLineBadgeClick} />
		);
	}

	if (stopId && stopData) {
		return (
			<p>{stopData.name}</p>
		);
	}

	//
}
