/* * */

import type { Line } from '@/types/lines.types';

import styles from './styles.module.css';

/* * */

interface LineBadgeProps {
	color?: string
	line?: Line
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
}

/* * */

export default function Component({ color = '#000', line, shortName = '• • •', size = 'md', textColor = '#fff' }: LineBadgeProps) {
	return (
		<div className={`${styles.badge} ${styles[size]}`} style={{ backgroundColor: line?.color || color, color: line?.text_color || textColor }}>
			{line?.short_name || shortName}
		</div>
	);
}
