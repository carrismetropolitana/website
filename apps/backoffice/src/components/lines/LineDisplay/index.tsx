'use client';
/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { useLinesContext } from '@/contexts/Lines.context';
import { ShimmerEffect } from '@payloadcms/ui';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	lineData?: Line
	lineId?: string
	longName?: string
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	width?: number
}

/* * */

export function LineDisplay({ color, lineData: lineDataProp, lineId, longName, shortName, size = 'md', textColor, width = 200 }: Props) {
	//

	const linesContext = useLinesContext();
	const resolvedLineData = lineId ? linesContext.actions.getLineDataById(lineId) : undefined;
	const lineData = lineDataProp ?? resolvedLineData;

	if (lineData) {
		return (
			<div className={styles.container}>
				<LineBadge color={lineData.color} shortName={lineData.short_name} size={size} textColor={lineData.text_color} />
				<LineName longName={lineData.long_name} size={size} />
			</div>
		);
	}

	if (longName && shortName && color && textColor) {
		return (
			<div className={styles.container}>
				<LineBadge color={color} shortName={shortName} size={size} textColor={textColor} />
				<LineName longName={longName} size={size} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<ShimmerEffect height={24} width={65} />
			<ShimmerEffect height={24} width={width} />
		</div>
	);

	//
}
