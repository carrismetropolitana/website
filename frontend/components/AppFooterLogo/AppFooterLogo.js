'use client';

import styles from './AppFooterLogo.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AppFooterLogo() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterLogo');

  //
  // F. Render Components

  return (
    <div className={styles.container}>
      <Image src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana-footer.svg" alt="Carris Metropolitana logo" width={180} height={64} />

      <div className={styles.contacts}>
        <div className={styles.contactGroup}>
          <a href="tel:+351210418800">{t('contacts.info_line.number')}</a>
          <p className={styles.legend}>{t('contacts.info_line.description')}</p>
          <p className={styles.disclaimer}>{t('contacts.info_line.disclaimer')}</p>
        </div>
        <div className={styles.contactGroup}>
          <a href="tel:+351210410400">{t('contacts.help_line.number')}</a>
          <p className={styles.legend}>{t('contacts.help_line.description')}</p>
          <p className={styles.disclaimer}>{t('contacts.help_line.disclaimer')}</p>
        </div>
      </div>

      <div className={styles.social}>
        <a href="https://www.facebook.com/carrismetropolitana" target="_blank">
          <Image src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/social-facebook.svg" alt="" width={24} height={24} />
        </a>
        <a href="https://www.instagram.com/carrismetropolitana/" target="_blank">
          <Image src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/social-instagram.svg" alt="" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
