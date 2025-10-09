/* * */

import { type NavigationLink } from '@/types/navigation.types';
import { Menu } from '@mantine/core';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	href: NavigationLink['href']
	icon?: NavigationLink['icon']
	label: string
	target?: NavigationLink['target']
}

/* * */

export function NavigationMainMenuItem({ href, icon, label, target, ...props }: Props) {
	return (
		<Menu.Item component={Link} href={href} target={target} {...props} classNames={{ item: styles.menuItem, itemLabel: styles.menuLabel }}>
			<span className={styles.icon}>
				{icon}
			</span>
			<span className={styles.label}>
				{label}
			</span>
			{target === '_blank' ? <IconExternalLink className={styles.arrowIndicator} size={18} /> : <IconArrowNarrowRight className={styles.arrowIndicator} size={20} />}
		</Menu.Item>
	);
}
