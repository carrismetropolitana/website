/* * */

import styles from './NextArrivals.module.css';
import { IconClock } from '@tabler/icons-react';
import LiveIcon from '@/components/LiveIcon/LiveIcon';
import NextArrivalsEstimated from '@/components/NextArrivalsEstimated/NextArrivalsEstimated';
import NextArrivalsScheduled from '@/components/NextArrivalsScheduled/NextArrivalsScheduled';

/* * */

export default function NextArrivals({ arrivalsData, type = 'scheduled' }) {
  //

  //
  // A. Render components

  if (type === 'estimated') {
    return (
      arrivalsData.length > 0 && (
        <div className={styles.container}>
          <LiveIcon />
          <div className={styles.arrivals}>
            {arrivalsData.map((item, index) => (
              <NextArrivalsEstimated key={index} estimatedArrivalInMinutes={item} />
            ))}
          </div>
        </div>
      )
    );
  }

  return (
    arrivalsData.length > 0 && (
      <div className={styles.container}>
        <IconClock size={14} stroke={2.5} />
        <div className={styles.arrivals}>
          {arrivalsData.map((item, index) => (
            <NextArrivalsScheduled key={index} arrivalTimeString={item} />
          ))}
        </div>
      </div>
    )
  );

  //
}
