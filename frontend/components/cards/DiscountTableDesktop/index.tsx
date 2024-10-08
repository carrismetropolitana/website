/* * */
import { Discount } from '@/types/discount.types';

import styles from './styles.module.css';

/* * */

export function DiscountTableDesktop({ discounts }: { discounts: Discount[] }) {
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
						<div className={styles.title}>{discount.title}</div>
						<div className={styles.description}>{discount.description}</div>
					</div>
					<div className={styles.cell}>
						<div className={styles.title}>{discount.price_metropolitano}</div>
					</div>
					<div className={styles.cell}>
						<div className={discount.price_municipal.toLowerCase() === 'n/a' ? styles.na : styles.title}>{discount.price_municipal}</div>
					</div>
				</div>
			))}
		</div>
	);
}
