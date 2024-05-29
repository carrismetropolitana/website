'use client';

import AppVersion from '@/components/AppVersion/AppVersion';
import DebugToggle from '@/components/DebugToggle/DebugToggle';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LiveIcon from '../LiveIcon/LiveIcon';
import styles from './FrontendFooterNav.module.css';

export default function FrontendFooterNav() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendFooterNav');

	// B. Render Components

	return (
		<div className={styles.container}>
			<nav className={styles.group}>
				<h6>{t('travel.title')}</h6>
				<Link className={styles.link} href="/lines">
					{t('travel.links.lines')}
					<LiveIcon />
				</Link>
				<Link className={`${styles.link} ${styles.realtime}`} href="/stops">
					{t('travel.links.stops')}
					<LiveIcon />
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/planeador">
					{t('travel.links.planner')}
				</Link>
			</nav>
			<nav className={styles.group}>
				<h6>{t('purchase.title')}</h6>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/cartoes">
					{t('purchase.links.cards')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/descontos">
					{t('purchase.links.discounts')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/viagens-frequentes">
					{t('purchase.links.frequent')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/viagens-ocasionais">
					{t('purchase.links.ocasional')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/tarifarios">
					{t('purchase.links.tariffs')}
				</Link>
			</nav>
			<nav className={styles.group}>
				<h6>{t('inform.title')}</h6>
				<Link className={`${styles.link} ${styles.realtime}`} href="/encm">
					{t('inform.links.helpdesks')}
					{' '}
					<LiveIcon />
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/apoio">
					{t('inform.links.help')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/perguntas-frequentes/1530">
					{t('inform.links.faq')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/noticias">
					{t('inform.links.news')}
				</Link>
			</nav>
			<nav className={styles.corporate}>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/carris-metropolitana">
					{t('corporate.links.brand')}
				</Link>
				<Link className={styles.link} href="https://www.carrismetropolitana.pt/opendata">
					{t('corporate.links.opendata')}
				</Link>
				<Link className={styles.link} href="https://status.carrismetropolitana.pt" target="_blank">
					{t('corporate.links.status')}
				</Link>
				<AppVersion />
				<DebugToggle />
			</nav>
		</div>
	);

	//
}
