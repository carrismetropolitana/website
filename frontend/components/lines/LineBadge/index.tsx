/* * */

import type { Line } from '@/types/lines.types';

import { IconInfoTriangleFilled } from '@tabler/icons-react';
import classNames from 'classnames/bind';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	line?: Line
	onClick?: () => void
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	withAlertIcon?: boolean
}

/* * */

const cx = classNames.bind(styles);

/* * */

export default function Component({ color = '#000', line, onClick, shortName = '• • •', size = 'md', textColor = '#fff', withAlertIcon = false }: Props) {
	return (
		<div
			className={cx({ badge: true, clickable: !!onClick, lg: size === 'lg', md: size === 'md' })}
			onClick={onClick}
			style={{ backgroundColor: line?.color || color, color: line?.text_color || textColor }}
		>
			{line?.short_name || shortName}
			{withAlertIcon && (
				<div className={styles.alertIcon}>
					<IconInfoTriangleFilled size={12} />
				</div>
			)}
		</div>
	);
}
