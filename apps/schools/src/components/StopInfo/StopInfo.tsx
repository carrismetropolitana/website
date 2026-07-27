'use client';

/* * */

import { LineDisplay } from '@/components/LineDisplay/LineDisplay';
import { getHubStopCode, useFilterByAgencyIds } from '@/hooks/useFilterByAgencyIds';
import { GoApiResponse } from '@/types/go-api-types';
import { type ApiResponse } from '@carrismetropolitana/api-types/common';
import { type Locality } from '@carrismetropolitana/api-types/locations';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubStop } from '@tmlmobilidade/go-types-public-info';
import Link from 'next/link';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './StopInfo.module.css';

/* * */

export default function StopInfo({ index, stop_id }) {
	//

	//
	// A. Fetch data
	const { data: allStopsData } = useSWR<GoApiResponse<HubStop[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/stops`, { refreshInterval: 900000 }); // 15 minutes
	const { data: allLocalitiesData } = useSWR<ApiResponse<Locality[]>, Error>(`${getPublicVariable('go_api_url')}/locations/api/locations/localities`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Filter data

	const filteredStopsData = useFilterByAgencyIds(allStopsData, { dataType: 'stop' }).data;

	//
	// C. Transform data

	const stopData: HubStop = useMemo(() => {
		return filteredStopsData.find(item => getHubStopCode(item) === stop_id);
	}, [filteredStopsData, stop_id]);

	const localityData: Locality = useMemo(() => {
		if (allLocalitiesData?.status !== 'success') return;
		return allLocalitiesData?.data?.find(item => item.id === stopData?.locality_id);
	}, [allLocalitiesData, stopData]);

	//
	// D. Render components

	return (
		stopData
		&& stopData.pattern_ids?.length > 0
		&& (
			<div className={styles.container}>
				<div className={styles.headerWrapper}>
					{index && <div className={styles.stopIndex}>{index}</div>}
					<div className={styles.header}>
						<div className={styles.stopName}>{stopData.name}</div>
						<div className={styles.stopDetails}>
							{localityData?.name && <div className={styles.stopLocation}>{localityData.name}</div>}
							<Link className={styles.stopId} href={`https://carrismetropolitana.pt/stops/${stopData._id}`} target="_blank">
								#
								{stopData._id}
							</Link>
							{index && (
								<Link className={styles.openInWebsite} href={`https://carrismetropolitana.pt/stops/${stopData._id}`} target="_blank">Ver no Tempo Real</Link>
							)}
						</div>
					</div>
				</div>

				<div className={styles.linesList}>
					{stopData.pattern_ids?.map(patternId => <LineDisplay key={patternId} patternId={patternId} />)}
				</div>
			</div>
		)
	);

	//
}
