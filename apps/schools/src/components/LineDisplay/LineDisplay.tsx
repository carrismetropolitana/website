'use client';

/* * */

import { type Pattern } from '@carrismetropolitana/api-types/network';
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

	const { data: patternData } = useSWR<Pattern[]>(`https://api.carrismetropolitana.pt/v2/patterns/${patternId}`);

	//
	// B. Render components

	if (patternData?.length > 0) {
		return (
			<a className={styles.container} href={`https://carrismetropolitana.pt/lines/${patternData[0].line_id}?active_pattern_id=${patternData[0].id}`} target="_blank">
				<div className={styles.badge} style={{ backgroundColor: patternData[0].color, color: patternData[0].text_color }}>
					{patternData[0].short_name || '• • •'}
				</div>
				<div className={styles.name}>
					{patternData[0].headsign}
				</div>
			</a>
		);
	}

	//
}
