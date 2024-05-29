'use client';

import { ActionIcon, Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import pjson from '../../package.json';
import DebugToggle from '../DebugToggle/DebugToggle';
import LiveIcon from '../LiveIcon/LiveIcon';
import styles from './FrontendHeaderDrawer.module.css';

export default function FrontendHeaderDrawer() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHeaderDrawer');

	const [opened, { close, open }] = useDisclosure(false);

	//
	// B. Render Components

	return (
		<>
			<Drawer onClose={close} opened={opened} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} padding={0} position="right" withCloseButton={false}>
				<div className={styles.container}>
					<div className={styles.closeButton}>
						<ActionIcon aria-label={t('close.label')} color="white" onClick={close} variant="light">
							<IconX size={30} />
						</ActionIcon>
					</div>
					<div className={styles.group}>
						<h1>{t('travel.title')}</h1>
						<Link href="/lines" onClick={close} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 6, justifyContent: 'flex-start' }}>
							{t('travel.links.lines')}
							{' '}
							<LiveIcon />
						</Link>
						<Link href="/stops" onClick={close} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 6, justifyContent: 'flex-start' }}>
							{t('travel.links.stops')}
							{' '}
							<LiveIcon />
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
						<Link href="/encm" onClick={close} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 6, justifyContent: 'flex-start' }}>
							{t('inform.links.helpdesks')}
							{' '}
							<LiveIcon />
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
			<ActionIcon aria-label="Abrir Menu" color="black" onClick={open} size="md" variant="subtle">
				<IconMenu2 size={40} />
			</ActionIcon>
		</>
	);
}
