/* * */

import { Link } from '@/translations/navigation';
import { IconArrowNarrowRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export default function Component({ href = '/', icon, label }) {
	return (
		<Link className={styles.container} href={href}>
			<div className={styles.iconWrapper}>
				{icon}
			</div>
			<div className={styles.label}>{label}</div>
			<div className={styles.arrowWrapper}>
				<IconArrowNarrowRight size={20} />
			</div>
		</Link>
	);
}
