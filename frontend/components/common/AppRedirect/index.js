'use client';

/* * */

import Loader from '@/components/common/Loader';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ toUrl }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppRedirect');

	//
	// B. Transform data

	useEffect(() => {
		if (toUrl) {
			window.location.replace(toUrl);
		}
	}, []);

	//
	// C. Handle actions

	const handleGoToUrl = () => {
		window.location.replace(toUrl);
	};

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<Loader visible />
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
			<Button color="orange" onClick={handleGoToUrl} size="xs" variant="subtle">
				{t('action')}
			</Button>
		</div>
	);

	//
}
