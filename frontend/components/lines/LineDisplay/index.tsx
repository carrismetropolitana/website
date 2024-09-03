/* * */

import LineBadge from '@/components/common/LineBadge';
import LineName from '@/components/lines/LineName';
import { Line } from '@/types/lines.types';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface LineDisplayProps {
	line?: Line
	size?: 'lg' | 'md'
	width?: number
}

/* * */

export default function Component({ line, size = 'md', width = 200 }: LineDisplayProps) {
	return line
		? (
			<div className={styles.container}>
				<LineBadge color={line.color} shortName={line.short_name} size={size} textColor={line.text_color} />
				<LineName longName={line.long_name} />
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} radius={9999} width={65} />
				<Skeleton height={24} width={width} />
			</div>
		);
}
