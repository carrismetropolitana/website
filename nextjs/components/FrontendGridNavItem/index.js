/* * */

import { Link } from '@/translations/navigation';
import { IconArrowRight } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export default function Component({ href = '/', icon, label }) {
	return (
		<Link className={styles.container} href={href}>
			<div className={styles.iconWrapper}>
				{icon}
			</div>
			<span className={styles.label}>{label}</span>
			<div className={styles.arrowWrapper}>
				<IconArrowRight size={22} />
			</div>
		</Link>
	);
}
