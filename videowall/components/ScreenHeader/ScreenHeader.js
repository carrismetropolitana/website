/* * */

import ScreenHeaderLogo from '@/components/ScreenHeaderLogo/ScreenHeaderLogo';

import styles from './ScreenHeader.module.css';

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
