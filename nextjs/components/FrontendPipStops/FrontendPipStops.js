/* * */

import { useTranslations } from 'next-intl';
import Text from '@/components/Text/Text';
import styles from './FrontendPipStops.module.css';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';
import Loader from '@/components/Loader/Loader';
import FrontendPipStopsStop from '@/components/FrontendPipStopsStop/FrontendPipStopsStop';

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
      <div className={styles.answersGrid}>{frontendPipContext.item_data ? frontendPipContext.item_data.stops.map((item) => <FrontendPipStopsStop key={item} stopId={item} />) : <Loader visible />}</div>
    </div>
  );

  //
}
