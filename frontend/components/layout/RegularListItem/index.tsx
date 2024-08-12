/* * */

import type { LegacyRef } from 'react';

import { Link } from '@/translations/navigation';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface RegularListItemProps {
	children?: React.ReactNode
	href: string
	icon?: React.ReactNode
	onClick?: () => void
	refFn?: LegacyRef<HTMLAnchorElement>
	style?: React.CSSProperties
}

/* * */

export default function Component({ children, href, icon, refFn, style }: RegularListItemProps) {
	return (
		<Link ref={refFn || undefined} className={styles.container} href={href} style={style}>
			{icon && (
				<div className={styles.iconWrapper}>
					{icon}
				</div>
			)}
			{children && (
				<div className={styles.childrenWrapper}>
					{children}
				</div>
			)}
			<div className={styles.arrowWrapper}>
				<IconArrowNarrowRight size={20} />
			</div>
		</Link>
	);
}
