/* * */

import ScreenHeaderLogo from '@/components/layout/ScreenHeaderLogo';

import styles from './styles.module.css';

/* * */

export default function ScreenHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.logoWrapper}>
				<ScreenHeaderLogo />
			</div>
		</div>
	);
}
