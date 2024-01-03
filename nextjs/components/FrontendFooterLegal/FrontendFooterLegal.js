'use client';

/* * */

import styles from './FrontendFooterLegal.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/* * */

export default function FrontendFooterLegal() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendFooterLegal');

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <div className={styles.copyright}>{t('copyright', { year: new Date().getFullYear() })}</div>
      <div className={styles.legalMenu}>
        <a target="_blank" href="https://www.livroreclamacoes.pt">
          <Image priority src="/images/livro-de-reclamacoes.svg" alt={t('complaints_book')} width={125} height={50} />
        </a>
        <a target="_blank" href="https://www.carrismetropolitana.pt/wp-content/uploads/2023/08/CM-CGT-20230807.pdf">
          {t('general_conditions')}
        </a>
        <a target="_blank" href="https://www.carrismetropolitana.pt/politica-de-privacidade/">
          {t('privacy_policy')}
        </a>
        <a target="_blank" href="/legal/cookies">
          {t('cookies_policy')}
        </a>
        <a target="_blank" href="https://www.carrismetropolitana.pt/aviso-legal/">
          {t('legal_disclaimer')}
        </a>
      </div>
    </div>
  );

  //
}
