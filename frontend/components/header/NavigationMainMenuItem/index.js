/* * */

import { Link } from '@/translations/navigation';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export default function Component({ href, icon, label, onClick, target, ...props }) {
	return (
		<Link href={href} target={target} {...props} className={styles.container} onClick={onClick}>
			<span className={styles.icon}>
				{icon}
			</span>
			<span className={styles.label}>
				{label}
			</span>
			<IconArrowNarrowRight className={styles.arrowIndicator} size={20} />
		</Link>
	);
}
