'use client';

/* * */

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './AppError.module.css';
import { IconBarrierBlock, IconMoodSad, IconTrafficCone } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';

/* * */

export default function AppError() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppError');
	const analyticsContext = useAppAnalyticsContext();

	const [reloadInSeconds, setReloadInSeconds] = useState(10);

	//
	// B. Transform data

	useEffect(() => {
		analyticsContext.capture('frontend_error', { url: window.location.href });
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (reloadInSeconds === 1) window.location.reload();
			else setReloadInSeconds(prev => prev - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [reloadInSeconds]);

	//
	// C. Handle actions

	const handleGoToHomepage = () => {
		window.location.href = 'https://www.carrismetropolitana.pt';
	};

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconTrafficCone size={75} className={styles.icon} />
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
			<p className={styles.retryMessage}>{t('retry', { value: reloadInSeconds })}</p>
			<Button onClick={handleGoToHomepage} variant='subtle' color='orange' size='xs'>
				{t('goto_home')}
			</Button>
		</div>
	);

	//
}