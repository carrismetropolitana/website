'use client';

import pjson from '../../package.json';
import styles from './AppHeaderDrawer.module.css';
import { Drawer, Button, ActionIcon } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';

export default function AppHeaderDrawer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterNav');

  const [opened, { open, close }] = useDisclosure(false);

  //
  // B. Render Components

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} withCloseButton={false} padding={0}>
        <div className={styles.container}>
          <div className={styles.group}>
            <h1>{t('travel.title')}</h1>
            <a href="https://www.carrismetropolitana.pt/horarios/">{t('travel.links.schedules')}</a>
            <a href="https://www.carrismetropolitana.pt/paragens/">{t('travel.links.stops')}</a>
            <a href="https://www.carrismetropolitana.pt/planeador/">{t('travel.links.planner')}</a>
          </div>
          <div className={styles.group}>
            <h1>{t('purchase.title')}</h1>
            <a href="https://www.carrismetropolitana.pt/cartoes/">{t('purchase.links.cards')}</a>
            <a href="https://www.carrismetropolitana.pt/descontos/">{t('purchase.links.discounts')}</a>
            <a href="https://www.carrismetropolitana.pt/viagens-frequentes/">{t('purchase.links.frequent')}</a>
            <a href="https://www.carrismetropolitana.pt/viagens-ocasionais/">{t('purchase.links.ocasional')}</a>
            <a href="https://www.carrismetropolitana.pt/tarifarios/">{t('purchase.links.tariffs')}</a>
          </div>
          <div className={styles.group}>
            <h1>{t('inform.title')}</h1>
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
      </Drawer>
      <ActionIcon onClick={open} variant="subtle" size="xl" color="black">
        <IconMenu2 size={40} />
      </ActionIcon>
    </>
  );
}
