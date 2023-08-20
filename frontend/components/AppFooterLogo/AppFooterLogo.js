'use client';

import styles from './AppFooterLogo.module.css';
import Image from 'next/image';

export default function AppFooterLogo() {
  //

  // F. Render Components

  return (
    <div className={styles.container}>
      <Image src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana-footer.svg" alt="Carris Metropolitana logo" width={180} height={64} />
    </div>
  );
}
