/* * */

import CardTemplate from '@/components/cards/CardTemplate';
import BigNumber from '@/components/text/BigNumber';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const COLORS = ['blue', 'orange', 'green', 'red'];

/* * */

export default function Component({ bigNumber = -1, comparison = 0, endDate = '', isLoading = false, isValidating = false, sections = [], startDate = '', timestamp = '', title = '' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('CardSummary');

	//
	// B. Render components

	return (
		<CardTemplate endDate={endDate} isLoading={isLoading} isValidating={isValidating} startDate={startDate} timestamp={timestamp} title={title}>
			<div className={styles.leftSection}>
				<BigNumber level={1} value={bigNumber} />
				<div className={styles.comparison}>{t('percentage', { value: comparison })}</div>
			</div>
			<div className={styles.body} />
			<div className={styles.footer}>
				{sections.length > 0
				&& sections.map((item, index) => (
					<div key={index} className={styles.columnWrapper}>
						<div className={styles.colTitle}>{item.label}</div>
						<div className={styles.colValue}>{t('number', { value: item.value })}</div>
					</div>
				))}
			</div>
		</CardTemplate>
	);

	//
}
