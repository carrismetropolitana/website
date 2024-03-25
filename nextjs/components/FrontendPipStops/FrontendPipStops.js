/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendPipStops.module.css';
import Text from '@/components/Text/Text';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';
import Loader from '../Loader/Loader';

/* * */

export default function FrontendPipStops() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendPipStops');
  const frontendPipContext = useFrontendPipContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <Text>{t('question')}</Text>
      <div className={styles.answersGrid}>{frontendPipContext.item_data ? frontendPipContext.item_data.stops.map((item) => <>jiusfdnuisd</>) : <Loader visible />}</div>
    </div>
  );

  //
}
