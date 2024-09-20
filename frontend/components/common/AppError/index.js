'use client';

/* * */

// import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Button } from '@mantine/core';
import { IconTrafficCone } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppError');
	// const analyticsContext = useAnalyticsContext();

	const [reloadInSeconds, setReloadInSeconds] = useState(10);

	// //
	// // B. Transform data

	// useEffect(() => {
	// 	analyticsContext.capture('frontend_error', { url: window.location.href });
	// });

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (reloadInSeconds === 1) window.location.reload();
	// 		else setReloadInSeconds(prev => prev - 1);
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// }, [reloadInSeconds]);

	//
	// C. Handle actions

	const handleGoToHomepage = () => {
		window.location.href = 'https://www.carrismetropolitana.pt';
	};

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconTrafficCone className={styles.icon} size={75} />
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
			<p className={styles.retryMessage}>{t('retry', { value: reloadInSeconds })}</p>
			<Button color="orange" onClick={handleGoToHomepage} size="xs" variant="subtle">
				{t('goto_home')}
			</Button>
		</div>
	);

	//
}
