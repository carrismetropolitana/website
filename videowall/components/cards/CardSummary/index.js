/* * */

import CardTemplate from '@/components/cards/CardTemplate';
import BigNumber from '@/components/text/BigNumber';
import Comparison from '@/components/text/Comparison';

import styles from './styles.module.css';

/* * */

export default function Component({ bigNumber = -1, comparison = 0, endDate = '', isLoading = false, isValidating = false, level = 1, startDate = '', timestamp = '', title = '' }) {
	return (
		<CardTemplate endDate={endDate} isLoading={isLoading} isValidating={isValidating} startDate={startDate} timestamp={timestamp} title={title}>
			<div className={styles.leftSection}>
				<BigNumber level={level} value={bigNumber} />
				<Comparison level={level} value={comparison} />
			</div>
		</CardTemplate>
	);
}
