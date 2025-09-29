/* * */

import { Loader } from '@/components/common/Loader';

import styles from './styles.module.css';

/* * */

export function AppLoader() {
	return (
		<div className={styles.rootFallback}>
			<div className={styles.container}>
				<Loader />
			</div>
		</div>
	);
}
