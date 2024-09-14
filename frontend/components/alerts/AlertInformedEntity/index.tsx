'use client';

/* * */

import type { Line } from '@/types/lines.types';
import type { Stop } from '@/types/stops.types';

import LineBadge from '@/components/common/LineBadge';
import { useRouter } from '@/i18n/routing';
import useSWR from 'swr';

/* * */

interface Props {
	lineId?: string
	stopId?: string
}

/* * */

export default function Component({ lineId, stopId }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Fetch data

	const { data: lineData } = useSWR<Line>(lineId && `https://api.carrismetropolitana.pt/v2/lines/${lineId}`);
	const { data: stopData } = useSWR<Stop>(stopId && `https://api.carrismetropolitana.pt/v2/stops/${stopId}`);

	//
	// C. Handle actions

	const handleLineBadgeClick = () => {
		router.push(`/lines/${lineId}`);
	};

	//
	// D. Render components

	if (lineId && lineData) {
		return (
			<LineBadge line={lineData} onClick={handleLineBadgeClick} />
		);
	}

	if (stopId && stopData) {
		return (
			<p>{stopData.name}</p>
		);
	}

	//
}
