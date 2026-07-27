'use client';

/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { GoApiResponse } from '@carrismetropolitana/website-shared-types';
import { HubPattern } from '@tmlmobilidade/go-types-public-info';
import useSWR from 'swr';

import styles from './LineDisplay.module.css';

/* * */

interface LineDisplayProps {
	patternId: string
}

/* * */

export function LineDisplay({ patternId }: LineDisplayProps) {
	//

	//
	// A. Fetch data

	const { data: patternData } = useSWR<GoApiResponse<HubPattern[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/patterns/${patternId}`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Render components

	if (patternData?.data?.length > 0) {
		return (
			<a className={styles.container} href={`https://carrismetropolitana.pt/lines/${patternData.data[0].line_id.replace(/^\[[^\]]+\]/, '')}?active_pattern_id=${patternData.data[0]._id.replace(/^\[[^\]]+\]/, '')}`} target="_blank">
				<div className={styles.badge} style={{ backgroundColor: patternData.data[0].color, color: patternData.data[0].text_color }}>
					{patternData.data[0].short_name || '• • •'}
				</div>
				<div className={styles.name}>
					{patternData.data[0].headsign}
				</div>
			</a>
		);
	}

	//
}
