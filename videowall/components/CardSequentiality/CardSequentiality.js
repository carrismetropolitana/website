'use client';

/* * */

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import CardTemplate from '@/components/CardTemplate/CardTemplate';
import BigNumber from '@/components/BigNumber/BigNumber';
import styles from './CardSequentiality.module.css';

/* * */

export default function CardSequentiality({ title = '', operatorId }) {
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
    <CardTemplate title={title} timestamp={sequentialityData?.timestamp} startDate={sequentialityData?.start_date} endDate={sequentialityData?.end_date} isLoading={sequentialityLoading} isValidating={sequentialityValidating}>
      <div className={styles.section}>
        <BigNumber label={t('sam_qty')} value={sequentialityData?.sam_qty} level={3} />
        <BigNumber label={t('sam_complete_qty')} value={sequentialityData?.sam_complete_qty} level={3} type="good" />
        <BigNumber label={t('sam_incomplete_qty')} value={sequentialityData?.sam_incomplete_qty} level={3} type="bad" />
      </div>
      <div className={styles.section}>
        <BigNumber label={t('transactions_expected_qty')} value={sequentialityData?.transactions_expected_qty} level={1} direction="column" />
        <BigNumber label={t('transactions_found_qty')} value={sequentialityData?.transactions_found_qty} level={1} type="good" direction="column" />
        <BigNumber label={t('transactions_missing_qty')} value={sequentialityData?.transactions_missing_qty} level={1} type="bad" direction="column" />
      </div>
      <div className={styles.samBreakdown}>{sequentialityData?.sam_breakdown.length > 0 && sequentialityData.sam_breakdown.map((item) => <div key={item.sam_serial_number} className={`${styles.samSquare} ${item.sam_complete && styles.samComplete}`} />)}</div>
    </CardTemplate>
  );

  //
}
