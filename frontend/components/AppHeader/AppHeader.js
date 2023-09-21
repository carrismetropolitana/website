'use client';

import Image from 'next/image';
import styles from './AppHeader.module.css';
import { Drawer, Button } from '@mantine/core';
import AppHeaderMenu from '@/components/AppHeaderMenu/AppHeaderMenu';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import AppHeaderDrawer from '../AppHeaderDrawer/AppHeaderDrawer';
import Link from 'next/link';

export default function AppHeader() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppHeader');

  const [opened, { open, close }] = useDisclosure(false);

  //
  // B. Render Components

  return (
    <div className={styles.container}>
      <Link href={'https://www.carrismetropolitana.pt'}>
        <Image priority src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana.svg" alt="Carris Metropolitana logo" width={180} height={64} />
      </Link>
      <div className={styles.navigation_menus}>
        <AppHeaderMenu
          title={t('menus.travel.label')}
          items={[
            { label: t('menus.travel.items.schedules.label'), url: 'https://www.carrismetropolitana.pt/horarios' },
            { label: t('menus.travel.items.stops.label'), url: '/stops' },
            { label: t('menus.travel.items.planner.label'), url: 'https://www.carrismetropolitana.pt/planeador' },
          ]}
        />
        <AppHeaderMenu
          title={t('menus.purchase.label')}
          items={[
            { label: t('menus.purchase.items.cards.label'), url: 'https://www.carrismetropolitana.pt/cartoes' },
            { label: t('menus.purchase.items.discounts.label'), url: 'https://www.carrismetropolitana.pt/descontos' },
            { label: t('menus.purchase.items.frequent_travels.label'), url: 'https://www.carrismetropolitana.pt/viagens-frequentes' },
            { label: t('menus.purchase.items.occasional_travels.label'), url: 'https://www.carrismetropolitana.pt/viagens-ocasionais' },
            { label: t('menus.purchase.items.tarifs.label'), url: 'https://www.carrismetropolitana.pt/tarifarios' },
          ]}
        />
        <AppHeaderMenu
          title={t('menus.inform.label')}
          items={[
            { label: t('menus.inform.items.schools.label'), url: 'https://escolas.carrismetropolitana.pt', target: '_blank' },
            { label: t('menus.inform.items.encm.label'), url: '/encm' },
            { label: t('menus.inform.items.help.label'), url: 'https://www.carrismetropolitana.pt/apoio' },
            { label: t('menus.inform.items.faq.label'), url: 'https://www.carrismetropolitana.pt/perguntas-frequentes/1530' },
            { label: t('menus.inform.items.news.label'), url: 'https://www.carrismetropolitana.pt/noticias' },
          ]}
        />
      </div>
      <div className={styles.navigation_drawer}>
        <AppHeaderDrawer />
      </div>
    </div>
  );
}
