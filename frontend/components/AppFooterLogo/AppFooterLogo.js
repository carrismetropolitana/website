'use client';

import Image from 'next/image';
import styles from './AppFooterLogo.module.css';
import { useTranslations } from 'next-intl';

export default function AppFooterLogo() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterLogo');

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <Image priority src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana-footer.svg" alt="Logo da Carris Metropolitana" width={180} height={64} />

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

      <div className={styles.social}>
        <a href="https://www.facebook.com/carrismetropolitana" target="_blank">
          <Image src="/icons/social-facebook.svg" alt={t('socials.facebook')} width={24} height={24} />
        </a>
        <a href="https://www.instagram.com/carrismetropolitana/" target="_blank">
          <Image src="/icons/social-instagram.svg" alt={t('socials.instagram')} width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
