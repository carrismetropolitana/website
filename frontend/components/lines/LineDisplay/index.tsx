/* * */

import LineBadge from '@/components/lines/LineBadge';
import LineName from '@/components/lines/LineName';
import { Line } from '@/types/lines.types';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	line?: Line
	longName?: string
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	width?: number
}

/* * */

export default function Component({ color, line, longName, shortName, size = 'md', textColor, width = 200 }: Props) {
//

	if (line) {
		return (
			<div className={styles.container}>
				<LineBadge color={line.color} shortName={line.short_name} size={size} textColor={line.text_color} />
				<LineName longName={line.long_name} />
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
}
