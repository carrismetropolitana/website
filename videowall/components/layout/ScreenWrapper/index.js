/* * */

import ScreenHeader from '@/components/layout/ScreenHeader';

import styles from './styles.module.css';

/* * */

export default function ScreenWrapper({ children }) {
	return (
		<div className={styles.container}>
			<ScreenHeader />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
