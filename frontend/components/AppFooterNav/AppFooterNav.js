'use client';

import Link from 'next/link';
import pjson from '../../package.json';
import DebugToggle from '@/components/DebugToggle/DebugToggle';
import styles from './AppFooterNav.module.css';
import { useTranslations } from 'next-intl';
import LiveIcon from '../LiveIcon/LiveIcon';

export default function AppFooterNav() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterNav');

  // B. Render Components

  return (
    <div className={styles.container}>
      <nav className={styles.group}>
        <h6>{t('travel.title')}</h6>
        <Link href="https://www.carrismetropolitana.pt/horarios">{t('travel.links.schedules')}</Link>
        <Link href="/stops" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 6 }}>
          {t('travel.links.stops')} <LiveIcon />
        </Link>
        <Link href="https://www.carrismetropolitana.pt/planeador">{t('travel.links.planner')}</Link>
      </nav>
      <nav className={styles.group}>
        <h6>{t('purchase.title')}</h6>
        <Link href="https://www.carrismetropolitana.pt/cartoes">{t('purchase.links.cards')}</Link>
        <Link href="https://www.carrismetropolitana.pt/descontos">{t('purchase.links.discounts')}</Link>
        <Link href="https://www.carrismetropolitana.pt/viagens-frequentes">{t('purchase.links.frequent')}</Link>
        <Link href="https://www.carrismetropolitana.pt/viagens-ocasionais">{t('purchase.links.ocasional')}</Link>
        <Link href="https://www.carrismetropolitana.pt/tarifarios">{t('purchase.links.tariffs')}</Link>
      </nav>
      <nav className={styles.group}>
        <h6>{t('inform.title')}</h6>
        <Link href="/encm" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 6 }}>
          {t('inform.links.helpdesks')} <LiveIcon />
        </Link>
        <Link href="https://www.carrismetropolitana.pt/apoio">{t('inform.links.help')}</Link>
        <Link href="https://www.carrismetropolitana.pt/perguntas-frequentes/1530">{t('inform.links.faq')}</Link>
        <Link href="https://www.carrismetropolitana.pt/noticias">{t('inform.links.news')}</Link>
      </nav>
      <nav className={styles.corporate}>
        <Link href="https://www.carrismetropolitana.pt/carris-metropolitana">{t('corporate.links.brand')}</Link>
        <Link href="https://recrutamento.carrismetropolitana.pt" target="_blank">
          {t('corporate.links.jobs')}
        </Link>
        <Link href="https://www.carrismetropolitana.pt/opendata">{t('corporate.links.opendata')}</Link>
        <Link href="https://status.carrismetropolitana.pt" target="_blank">
          {t('corporate.links.status')}
        </Link>
        <Link className={styles.version} href="https://www.github.com/carrismetropolitana/website" target="_blank">
          {pjson.version}
        </Link>
        <DebugToggle />
      </nav>
    </div>
  );

  //
}
