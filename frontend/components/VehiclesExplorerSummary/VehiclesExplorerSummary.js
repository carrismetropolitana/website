/* * */

import { useTranslations } from 'next-intl';
import styles from './VehiclesExplorerSummary.module.css';
import VehiclesExplorerSummaryRow from '@/components/VehiclesExplorerSummaryRow/VehiclesExplorerSummaryRow';

/* * */

export default function VehiclesExplorerSummary() {
  //

  //
  // A. Setup variables

  const t = useTranslations('VehiclesExplorerSummary');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.intro}>{t('intro')}</div>
      <VehiclesExplorerSummaryRow />
      <VehiclesExplorerSummaryRow mirrored />
      <VehiclesExplorerSummaryRow />
      <VehiclesExplorerSummaryRow mirrored />
      <VehiclesExplorerSummaryRow />
    </div>
  );

  //
}
