/* * */

import type { LegacyRef } from 'react';

import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	href: string
	icon?: React.ReactNode
	onClick?: () => void
	refFn?: LegacyRef<HTMLAnchorElement>
	style?: React.CSSProperties
}

/* * */

export function RegularListItem({ children, href, icon, refFn, style }: Props) {
	return (
		<Link ref={refFn || undefined} className={`${styles.container} ${href === '#' && styles.disableLink}`} href={href} style={style}>
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
			{href !== '#' && (
				<div className={styles.arrowWrapper}>
					<IconArrowNarrowRight size={20} />
				</div>
			)}
		</Link>
	);
}
