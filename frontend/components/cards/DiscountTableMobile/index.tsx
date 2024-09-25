/* * */
import { Discount } from '@/types/discount.types';
import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

export default function Component({ discounts }: { discounts: Discount[] }) {
	return (
		<div className={styles.table}>
			<div className={styles.table__head}>
				<div className={styles.table__head__info}>
					<div className={styles.cell}>Desconto</div>
				</div>
				<div className={styles.table__head__pricing}>
					<div className={styles.cell}>Metropolitano</div>
					<div className={styles.cell}>Municipal</div>
				</div>
			</div>
			<div className={styles.table__body}>
				{discounts.map((discount, index) => (
					<div key={index}>
						<div className={styles.info}>
							<div className={styles.content}>
								<h3>{discount.name}</h3>
								<p>{discount.description}</p>
							</div>
						</div>
						<div className={styles.pricing}>
							<div className={styles.content}>
								<div className={styles.cell}>{discount.metropolitan}</div>
								<div className={classNames(styles.cell, discount.municipal.toLowerCase() === 'n/a' && styles.na)}>{discount.municipal}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
