/* * */

import styles from './FrontendDemandDateLineStopViewOne.module.css';
import FrontendDemandDateLineStopViewOneMap from '@/components/FrontendDemandDateLineStopViewOneMap/FrontendDemandDateLineStopViewOneMap';
import FrontendDemandDateLineStopViewOneToolbar from '@/components/FrontendDemandDateLineStopViewOneToolbar/FrontendDemandDateLineStopViewOneToolbar';
import FrontendDemandDateLineStopViewOneDatePicker from '@/components/FrontendDemandDateLineStopViewOneDatePicker/FrontendDemandDateLineStopViewOneDatePicker';

/* * */

export default function FrontendDemandDateLineStopViewOne() {
  return (
    <div className={styles.container}>
      <FrontendDemandDateLineStopViewOneDatePicker />
      <div className={styles.mapWrapper}>
        <FrontendDemandDateLineStopViewOneToolbar />
        <FrontendDemandDateLineStopViewOneMap />
      </div>
    </div>
  );
}
