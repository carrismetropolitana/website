'use client';

import pjson from '../../package.json';
import styles from './FrontendHeaderDrawer.module.css';
import { Drawer, Button, ActionIcon } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconX } from '@tabler/icons-react';
import DebugToggle from '../DebugToggle/DebugToggle';
import Link from 'next/link';
import LiveIcon from '../LiveIcon/LiveIcon';

export default function FrontendHeaderDrawer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendHeaderDrawer');

  const [opened, { open, close }] = useDisclosure(false);

  //
  // B. Render Components

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} withCloseButton={false} padding={0}>
        <div className={styles.container}>
          <div className={styles.closeButton}>
            <ActionIcon onClick={close} variant="light" color="white" aria-label={t('close.label')}>
              <IconX size={30} />
            </ActionIcon>
          </div>
          <div className={styles.group}>
            <h1>{t('travel.title')}</h1>
            <Link href="/lines" onClick={close} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 6 }}>
              {t('travel.links.lines')} <LiveIcon />
            </Link>
            <Link href="/stops" onClick={close} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 6 }}>
              {t('travel.links.stops')} <LiveIcon />
            </Link>
            <Link href="https://www.carrismetropolitana.pt/planeador">{t('travel.links.planner')}</Link>
          </div>
          <div className={styles.group}>
            <h1>{t('purchase.title')}</h1>
            <Link href="https://www.carrismetropolitana.pt/cartoes">{t('purchase.links.cards')}</Link>
            <Link href="https://www.carrismetropolitana.pt/descontos">{t('purchase.links.discounts')}</Link>
            <Link href="https://www.carrismetropolitana.pt/viagens-frequentes">{t('purchase.links.frequent')}</Link>
            <Link href="https://www.carrismetropolitana.pt/viagens-ocasionais">{t('purchase.links.ocasional')}</Link>
            <Link href="https://www.carrismetropolitana.pt/tarifarios">{t('purchase.links.tariffs')}</Link>
          </div>
          <div className={styles.group}>
            <h1>{t('inform.title')}</h1>
            <Link href="/encm" onClick={close} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 6 }}>
              {t('inform.links.helpdesks')} <LiveIcon />
            </Link>
            <Link href="https://www.carrismetropolitana.pt/apoio">{t('inform.links.help')}</Link>
            <Link href="https://www.carrismetropolitana.pt/perguntas-frequentes/1530">{t('inform.links.faq')}</Link>
            <Link href="https://www.carrismetropolitana.pt/noticias">{t('inform.links.news')}</Link>
          </div>
          <div className={styles.corporate}>
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
          </div>
        </div>
      </Drawer>
      <ActionIcon onClick={open} variant="subtle" size="md" color="black" aria-label="Abrir Menu">
        <IconMenu2 size={40} />
      </ActionIcon>
    </>
  );
}
