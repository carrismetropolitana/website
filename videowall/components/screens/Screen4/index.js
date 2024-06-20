/* * */

import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';

import styles from './styles.module.css';

/* * */

export default function Screen1() {
	return (
		<ScreenWrapper>
			<Columns cols={1} />
			<div className={styles.logo}>
				<img alt="Screen4" src="/portugal2020.jpg" />
			</div>
		</ScreenWrapper>
	);
}
