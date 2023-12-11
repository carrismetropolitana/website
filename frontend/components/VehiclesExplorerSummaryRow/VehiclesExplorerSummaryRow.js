'use client';

/* * */

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './VehiclesExplorerSummaryRow.module.css';

/* * */

export default function VehiclesExplorerSummaryRow({ mirrored = false, vehicleModel = 'Mercedes-Benz' }) {
  //

  //
  // A. Setup variables

  //   const t = useTranslations('VehiclesExplorerSummaryRow');

  //
  // B. Render components

  if (mirrored) {
    return (
      <div className={`${styles.container} ${styles.mirrored}`}>
        <div className={styles.detailsWrapper}>
          <h3>{vehicleModel}</h3>
        </div>
        <div className={styles.imageWrapper}>
          <Image src={'/vehicles/placeholder.png'} alt="Picture of the author" sizes="500px" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.mirrored}`}>
      <div className={styles.imageWrapper}>
        <Image src={'/vehicles/placeholder.png'} alt="Picture of the author" sizes="500px" fill style={{ objectFit: 'contain' }} />
      </div>
      <div className={styles.detailsWrapper}>
        <h3>{vehicleModel}</h3>
      </div>
    </div>
  );

  //
}
