'use client';

/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import classNames from 'classnames/bind';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	lineData?: Line
	shortName?: string
	textColor?: string
}

/* * */

const cx = classNames.bind(styles);

/* * */

export function VehicleListMapBadge({ lineData }: Props) {
	// A. Render components
	return (
		<>
			<div className={cx({ badge: true, md: 'md' })} style={{ backgroundColor: lineData?.color, color: lineData?.text_color, marginBottom: '10px' }}>
				{lineData?.short_name || '• • •'}
			</div>
			<div>
				<p className={styles.line_name}>{lineData?.long_name}</p>
			</div>
		</>
	);
	//
}
