'use client';

/* * */

import FrontendHeaderMenu from '@/components/FrontendHeaderMenu/FrontendHeaderMenu'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import FrontendHeaderDrawer from '../FrontendHeaderDrawer/FrontendHeaderDrawer'
import styles from './FrontendHeader.module.css'

/* * */

export default function FrontendHeader() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendHeader');

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <Link href="https://www.carrismetropolitana.pt">
        <Image alt="Carris Metropolitana logo" height={64} priority src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana.svg" width={180} />
      </Link>
      <div className={styles.navigation_menus}>
        <FrontendHeaderMenu
          items={[
					  { label: t('menus.travel.items.lines.label'), realtime: true, url: '/lines' },
					  { label: t('menus.travel.items.stops.label'), realtime: true, url: '/stops' },
					  { label: t('menus.travel.items.planner.label'), url: 'https://www.carrismetropolitana.pt/planeador' },
          ]}
          title={t('menus.travel.label')}
        />
        <FrontendHeaderMenu
          items={[
					  { label: t('menus.purchase.items.cards.label'), url: 'https://www.carrismetropolitana.pt/cartoes' },
					  { label: t('menus.purchase.items.discounts.label'), url: 'https://www.carrismetropolitana.pt/descontos' },
					  { label: t('menus.purchase.items.frequent_travels.label'), url: 'https://www.carrismetropolitana.pt/viagens-frequentes' },
					  { label: t('menus.purchase.items.occasional_travels.label'), url: 'https://www.carrismetropolitana.pt/viagens-ocasionais' },
					  { label: t('menus.purchase.items.tarifs.label'), url: 'https://www.carrismetropolitana.pt/tarifarios' },
          ]}
          title={t('menus.purchase.label')}
        />
        <FrontendHeaderMenu
          items={[
					  { label: t('menus.inform.items.schools.label'), target: '_blank', url: 'https://escolas.carrismetropolitana.pt' },
					  { label: t('menus.inform.items.encm.label'), realtime: true, url: '/encm' },
					  { label: t('menus.inform.items.help.label'), url: 'https://www.carrismetropolitana.pt/apoio' },
					  { label: t('menus.inform.items.faq.label'), url: 'https://www.carrismetropolitana.pt/perguntas-frequentes/1530' },
					  { label: t('menus.inform.items.news.label'), url: 'https://www.carrismetropolitana.pt/noticias' },
          ]}
          title={t('menus.inform.label')}
        />
      </div>
      <div className={styles.navigation_drawer}>
        <FrontendHeaderDrawer />
      </div>
    </div>
  )

  //
}
