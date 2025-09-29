/* * */

import { IconArrowNarrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	description?: string
	href?: string
	icon?: React.ReactNode
	label?: string
}

/* * */

export function GridNavItem({ description, href = '/', icon, label }: Props) {
	return (
		<Link className={styles.container} href={href}>
			{icon && <div className={styles.iconWrapper}>{icon}</div>}
			<div className={styles.contentWrapper}>
				{label && <div className={styles.label}>{label}</div>}
				{description && <div className={styles.description}>{description}</div>}
			</div>
			<div className={styles.arrowWrapper}>
				<IconArrowNarrowRight size={20} />
			</div>
		</Link>
	);
}
