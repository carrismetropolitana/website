'use client';

import styles from './AppFooterLegal.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AppFooterLegal() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterLegal');

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <div className={styles.copyright}>{t('copyright')}</div>
      <div className={styles.legalMenu}>
        <a target="_blank" href="https://www.livroreclamacoes.pt">
          <Image priority src="/images/livro-de-reclamacoes.svg" alt={t('complaints_book')} width={125} height={50} />
        </a>
        <a href="/legal/conditions">{t('general_conditions')}</a>
        <a href="/legal/privacy">{t('privacy_policy')}</a>
        <a href="/legal/cookies">{t('cookies_policy')}</a>
        <a href="/legal/disclaimer">{t('legal_disclaimer')}</a>
      </div>
    </div>
  );
}
