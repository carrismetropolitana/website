/* * */
import { Discount } from '@/types/discount.types';

import styles from './styles.module.css';

/* * */

export default function Component({ discounts }: { discounts: Discount[] }) {
	return (
		<div className={styles.table}>
			<div className={styles.row}>
				<div className={styles.cell}>Desconto</div>
				<div className={styles.cell}>Metropolitano</div>
				<div className={styles.cell}>Municipal</div>
			</div>
			{discounts.map((discount, index) => (
				<div key={index} className={styles.row}>
					<div className={styles.cell}>
						<div className={styles.title}>{discount.name}</div>
						<div className={styles.description}>{discount.description}</div>
					</div>
					<div className={styles.cell}>
						<div className={styles.title}>{discount.metropolitan}</div>
					</div>
					<div className={styles.cell}>
						<div className={discount.municipal.toLowerCase() === 'n/a' ? styles.na : styles.title}>{discount.municipal}</div>
					</div>
				</div>
			))}
		</div>
	);
}
