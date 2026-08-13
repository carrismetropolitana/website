'use client';

/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { useLinesContext } from '@/contexts/Lines.context';
import { IconInfoTriangleFilled } from '@tabler/icons-react';
import classNames from 'classnames/bind';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	lineData?: Line
	lineId?: string
	onClick?: () => void
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	withAlertIcon?: boolean
}

/* * */

const cx = classNames.bind(styles);

/* * */

export function LineBadge({ color, lineData, lineId, onClick, shortName, size = 'md', textColor, withAlertIcon = false }: Props) {
	//

	//
	// A. Setup variables

	const linesContext = useLinesContext();

	//
	// B. Transform data

	const fetchedLineData = lineId ? linesContext.actions.getLineDataById(lineId) : undefined;

	//
	// C. Render components

	return (
		<div
			className={cx({ badge: true, clickable: !!onClick, lg: size === 'lg', md: size === 'md' })}
			onClick={onClick}
			style={{ backgroundColor: color || lineData?.color || fetchedLineData?.color, color: textColor || lineData?.text_color || fetchedLineData?.text_color }}
		>
			{shortName || lineData?.short_name || fetchedLineData?.short_name || '• • •'}
			{withAlertIcon && (
				<div className={styles.alertIcon}>
					<IconInfoTriangleFilled size={12} />
				</div>
			)}
		</div>
	);

	//
}
