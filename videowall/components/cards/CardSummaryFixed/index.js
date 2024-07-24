/* * */

import CardTemplate from '@/components/cards/CardTemplate';
import BigNumberString from '@/components/text/BigNumberString';
import ComparisonAbsolute from '@/components/text/ComparisonAbsolute';

import styles from './styles.module.css';

/* * */

export default function Component({ bigNumber = -1, comparison = 0, endDate = '', isLoading = false, isValidating = false, level = 1, startDate = '', timestamp = '', title = '' }) {
	return (
		<CardTemplate endDate={endDate} isLoading={isLoading} isValidating={isValidating} startDate={startDate} timestamp={timestamp} title={title}>
			<div className={styles.leftSection}>
				<BigNumberString level={level} value={bigNumber} />
				<ComparisonAbsolute level={level} value={comparison} />
			</div>
		</CardTemplate>
	);
}
