/* * */

import ScreenHeader from '@/components/ScreenHeader/ScreenHeader';

import styles from './ScreenWrapper.module.css';

/* * */

export default function ScreenWrapper({ children }) {
	return (
		<div className={styles.container}>
			<ScreenHeader />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
