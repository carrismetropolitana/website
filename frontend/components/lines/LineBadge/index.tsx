/* * */

import styles from './styles.module.css';

/* * */

interface LineBadgeProps {
	color: string
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
}

/* * */

export default function Component({ color = '#000', shortName = '• • •', size = 'md', textColor = '#fff' }: LineBadgeProps) {
	return (
		<div className={`${styles.badge} ${styles[size]}`} style={{ backgroundColor: color, color: textColor }}>
			{shortName}
		</div>
	);
}
