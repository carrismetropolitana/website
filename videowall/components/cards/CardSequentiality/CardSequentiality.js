'use client';

/* * */

import CardTemplate from '@/components/cards/CardTemplate';
import BigNumber from '@/components/text/BigNumber';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ operatorId, title = '' }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('CardSequentiality');

	//
	// B. Fetch data

	const { data: sequentialityData, isLoading: sequentialityLoading, isValidating: sequentialityValidating } = useSWR(operatorId && `/api/${operatorId}/sequentiality`);

	//
	// C. Render components

	return (
		<CardTemplate endDate={sequentialityData?.end_date} isLoading={sequentialityLoading} isValidating={sequentialityValidating} startDate={sequentialityData?.start_date} timestamp={sequentialityData?.timestamp} title={title}>
			<div className={styles.section}>
				<BigNumber label={t('sam_qty')} level={3} value={sequentialityData?.sam_qty} />
				<BigNumber label={t('sam_complete_qty')} level={3} type="good" value={sequentialityData?.sam_complete_qty} />
				<BigNumber label={t('sam_incomplete_qty')} level={3} type="bad" value={sequentialityData?.sam_incomplete_qty} />
			</div>
			<div className={styles.section}>
				<BigNumber direction="column" label={t('transactions_expected_qty')} level={1} value={sequentialityData?.transactions_expected_qty} />
				<BigNumber direction="column" label={t('transactions_found_qty')} level={1} type="good" value={sequentialityData?.transactions_found_qty} />
				<BigNumber direction="column" label={t('transactions_missing_qty')} level={1} type="bad" value={sequentialityData?.transactions_missing_qty} />
			</div>
			<div className={styles.samBreakdown}>{sequentialityData?.sam_breakdown.length > 0 && sequentialityData.sam_breakdown.map(item => <div key={item.sam_serial_number} className={`${styles.samSquare} ${item.sam_complete && styles.samComplete}`} />)}</div>
		</CardTemplate>
	);

	//
}
