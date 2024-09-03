/* * */

import type { NavigationLink } from '@/types/navigation.types';

import { Link } from '@/translations/navigation';
import { IconArrowNarrowRight, IconExternalLink } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	label: string
	navigationLink: NavigationLink
	onClick?: () => void
}

/* * */

export default function Component({ label, navigationLink, onClick, ...props }: Props) {
	return (
		<Link href={navigationLink.href} target={navigationLink.target} {...props} className={styles.container} onClick={onClick}>
			<span className={styles.icon}>
				{navigationLink.icon}
			</span>
			<span className={styles.label}>
				{label}
			</span>
			{navigationLink.target === '_blank' ? <IconExternalLink className={styles.arrowIndicator} size={16} /> : <IconArrowNarrowRight className={styles.arrowIndicator} size={20} />}
		</Link>
	);
}
