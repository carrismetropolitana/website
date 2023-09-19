'use client';

import pjson from '../../package.json';
import styles from './AppFooterNav.module.css';
import { useTranslations } from 'next-intl';

export default function AppFooterNav() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterNav');

  // B. Render Components

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <p>{t('travel.title')}</p>
        <a href="https://www.carrismetropolitana.pt/horarios/">{t('travel.links.schedules')}</a>
        <a href="https://www.carrismetropolitana.pt/paragens/">{t('travel.links.stops')}</a>
        <a href="https://www.carrismetropolitana.pt/planeador/">{t('travel.links.planner')}</a>
      </div>
      <div className={styles.group}>
        <p>{t('purchase.title')}</p>
        <a href="https://www.carrismetropolitana.pt/cartoes/">{t('purchase.links.cards')}</a>
        <a href="https://www.carrismetropolitana.pt/descontos/">{t('purchase.links.discounts')}</a>
        <a href="https://www.carrismetropolitana.pt/viagens-frequentes/">{t('purchase.links.frequent')}</a>
        <a href="https://www.carrismetropolitana.pt/viagens-ocasionais/">{t('purchase.links.ocasional')}</a>
        <a href="https://www.carrismetropolitana.pt/tarifarios/">{t('purchase.links.tariffs')}</a>
      </div>
      <div className={styles.group}>
        <p>{t('inform.title')}</p>
        <a href="https://www.carrismetropolitana.pt/espacos-navegante/">{t('inform.links.helpdesks')}</a>
        <a href="https://www.carrismetropolitana.pt/apoio/">{t('inform.links.help')}</a>
        <a href="https://www.carrismetropolitana.pt/perguntas-frequentes/1530/">{t('inform.links.faq')}</a>
        <a href="https://www.carrismetropolitana.pt/noticias/">{t('inform.links.news')}</a>
      </div>
      <div className={styles.corporate}>
        <a href="https://www.carrismetropolitana.pt/carris-metropolitana/">{t('corporate.links.brand')}</a>
        <a href="https://recrutamento.carrismetropolitana.pt/" target="_blank">
          {t('corporate.links.jobs')}
        </a>
        <a href="https://www.carrismetropolitana.pt/opendata/">{t('corporate.links.opendata')}</a>
        <a href="https://status.carrismetropolitana.pt/" target="_blank">
          {t('corporate.links.status')}
        </a>
        <a className={styles.version} href="https://www.github.com/carrismetropolitana/website" target="_blank">
          {pjson.version}
        </a>
      </div>
    </div>
  );

  //
}
