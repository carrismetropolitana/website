/* * */

import styles from './styles.module.css';

/* * */

export function PipsArrivalsTableEmpty() {
	return (
		<div className={styles.container}>
			<div className={styles.empty}>Sem serviço disponível</div>
		</div>
	);
}
