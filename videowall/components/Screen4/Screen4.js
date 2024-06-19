/* * */

import styles from './Screen4.module.css';
import Columns from '@/components/Columns/Columns';
import ScreenWrapper from '@/components/ScreenWrapper/ScreenWrapper';
import CardSequentiality from '@/components/CardSequentiality/CardSequentiality';

/* * */

export default function Screen1() {
  return (
    <ScreenWrapper>
      <Columns cols={1}>
        <CardSequentiality title="Sequencialidade A4 (ALSA)" operatorId={44} />
      </Columns>
      <div className={styles.logo}>
        <img src="/portugal2020.jpg" alt="Screen4" />
      </div>
    </ScreenWrapper>
  );
}