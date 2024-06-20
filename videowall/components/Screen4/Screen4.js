/* * */

import Columns from '@/components/Columns/Columns';
import ScreenWrapper from '@/components/ScreenWrapper/ScreenWrapper';

import styles from './Screen4.module.css';

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
