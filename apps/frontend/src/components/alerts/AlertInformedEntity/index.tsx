'use client';

/* * */

import { LineBadge } from '@/components/lines/LineBadge';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { type Line, type Stop } from '@carrismetropolitana/api-types/network';
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

	const lineData = useMemo<Line | undefined>(() => {
		return linesContext.data.lines?.find(line => line.id === lineId || line.route_ids.some(itemId => itemId === routeId));
	}, [linesContext.data.lines]);

	const stopData = useMemo<Stop | undefined>(() => {
		return stopsContext.data.stops?.find(stop => stop.id === stopId);
	}, [stopsContext.data.stops]);

	//
	// C. Handle actions

	const handleLineBadgeClick = () => {
		const lineHref = environmentContext.actions.getNormalizedHref(`/lines/${lineData?.id}`);
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
			<p>{stopData.long_name}</p>
		);
	}

	//
}
