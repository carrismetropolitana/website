/* * */
import { Discount } from '@/types/discount.types';
import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

export function DiscountTableMobile({ discounts }: { discounts: Discount[] }) {
	return (
		<div className={styles.table}>
			<div className={styles.tableHead}>
				<div className={styles.tableHeadInfo}>
					<div className={styles.cell}>Desconto</div>
				</div>
				<div className={styles.tableHeadPricing}>
					<div className={styles.cell}>Metropolitano</div>
					<div className={styles.cell}>Municipal</div>
				</div>
			</div>
			<div className={styles.tableBody}>
				{discounts.map((discount, index) => (
					<div key={index}>
						<div className={styles.info}>
							<div className={styles.content}>
								<h3>{discount.title}</h3>
								<p>{discount.description}</p>
							</div>
						</div>
						<div className={styles.pricing}>
							<div className={styles.content}>
								<div className={styles.cell}>{discount.price_metropolitano}</div>
								<div className={classNames(styles.cell, discount.price_municipal.toLowerCase() === 'n/a' && styles.na)}>{discount.price_municipal}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
