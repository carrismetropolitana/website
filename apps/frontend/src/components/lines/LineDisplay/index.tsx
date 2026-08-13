/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	lineData?: Line
	longName?: string
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	width?: number
}

/* * */

export function LineDisplay({ color, lineData, longName, shortName, size = 'md', textColor, width = 200 }: Props) {
	//

	if (lineData) {
		return (
			<div className={styles.container}>
				<LineBadge color={lineData.color} shortName={lineData.short_name} size={size} textColor={lineData.text_color} />
				<LineName longName={lineData.long_name} />
			</div>
		);
	}

	if (longName && shortName && color && textColor) {
		return (
			<div className={styles.container}>
				<LineBadge color={color} shortName={shortName} size={size} textColor={textColor} />
				<LineName longName={longName} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Skeleton height={24} radius={9999} width={65} />
			<Skeleton height={24} width={width} />
		</div>
	);

	//
}
