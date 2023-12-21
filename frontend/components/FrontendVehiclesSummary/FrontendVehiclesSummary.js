/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendVehiclesSummary.module.css';
import FrontendVehiclesSummaryRow from '@/components/FrontendVehiclesSummaryRow/FrontendVehiclesSummaryRow';

/* * */

export default function FrontendVehiclesSummary() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendVehiclesSummary');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.intro}>{t('intro')}</div>
      <FrontendVehiclesSummaryRow />
      <FrontendVehiclesSummaryRow mirrored />
      <FrontendVehiclesSummaryRow />
      <FrontendVehiclesSummaryRow mirrored />
      <FrontendVehiclesSummaryRow />
    </div>
  );

  //
}
