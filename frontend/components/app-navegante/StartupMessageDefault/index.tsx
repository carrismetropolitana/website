'use client';

/* * */

import { useEnvironmentContext } from '@/contexts/Environment.context';
import { Link } from '@/i18n/routing';
import { Button } from '@mantine/core';
import { IconArrowBigUpLinesFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const APP_NAVEGANTE_ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=pt.card4b.navegante';
const APP_NAVEGANTE_IOS_STORE_URL = 'https://apps.apple.com/pt/app/navegante/id6484591306';

/* * */

export function StartupMessageDefault() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app-navegante.StartupMessageDefault');
	const environmentContext = useEnvironmentContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<IconArrowBigUpLinesFilled className={styles.icon} />
				<h1 className={styles.heading}>{t('heading')}</h1>
				<h2 className={styles.subheading}>{t('subheading')}</h2>
				<p className={styles.text}>{t('text')}</p>
			</div>
			<div className={styles.actionsWrapper}>
				{environmentContext === 'app-navegante-android' && (
					<Button component={Link} href={APP_NAVEGANTE_ANDROID_STORE_URL}>
						{t('actions.update_android')}
					</Button>
				)}
				{environmentContext === 'app-navegante-ios' && (
					<Button component={Link} href={APP_NAVEGANTE_IOS_STORE_URL}>
						{t('actions.update_ios')}
					</Button>
				)}
			</div>
		</div>
	);

	//
}
