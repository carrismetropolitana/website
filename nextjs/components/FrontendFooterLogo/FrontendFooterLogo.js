'use client';

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import styles from './FrontendFooterLogo.module.css'

export default function FrontendFooterLogo() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendFooterLogo');

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <Image alt="Logo da Carris Metropolitana" height={64} priority src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana-footer.svg" width={180} />

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
          <Image alt={t('socials.facebook')} height={24} src="/icons/social-facebook.svg" width={24} />
        </a>
        <a href="https://www.instagram.com/carrismetropolitana" target="_blank">
          <Image alt={t('socials.instagram')} height={24} src="/icons/social-instagram.svg" width={24} />
        </a>
        <a href="https://www.whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K" target="_blank">
          <Image alt={t('socials.instagram')} height={24} src="/icons/social-whatsapp.svg" width={24} />
        </a>
        <a href="https://twitter.com/CMetropolitana_" target="_blank">
          <Image alt={t('socials.instagram')} height={24} src="/icons/social-twitter.svg" width={24} />
        </a>
      </div>
    </div>
  )
}
