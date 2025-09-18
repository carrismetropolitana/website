'use client';

/* * */

import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { URLS } from '@/settings/urls.settings';
import { Button, Image } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function AppNaveganteStartup20250115() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app-navegante.AppNaveganteStartup20250115');
	const environmentContext = useEnvironmentContext();

	//
	// B. Handle actions

	const handleClose = () => {
		if (environmentContext.data.value === 'app-navegante-ios') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).webkit.messageHandlers.closeButtonClicked.postMessage('');
		}
		if (environmentContext.data.value === 'app-navegante-android') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).Android.closeButtonClicked();
		}
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<ThemeSwitch
					dark={<Image className={styles.icon} src="/assets/app-navegante/startup/_default/update-icon-dark.svg" />}
					light={<Image className={styles.icon} src="/assets/app-navegante/startup/_default/update-icon-light.svg" />}
				/>
				<h1 className={styles.heading}>{t('heading')}</h1>
				<p className={styles.text}>{t('paragraph_1')}</p>
				<div className={styles.textWrapper}>
					<p className={styles.text}>{t('paragraph_2')}</p>
					<p className={styles.text}>{t('paragraph_3')}</p>
					<p className={styles.text}>{t('paragraph_4')}</p>
				</div>
				<p className={styles.text}>{t('paragraph_5')}</p>
			</div>
			<div className={styles.actionsWrapper}>
				{environmentContext.data.value === 'app-navegante-android' && (
					<Button component={Link} href={URLS.app_navegante.google_play_store.prod}>
						{t('actions.update_android')}
					</Button>
				)}
				{environmentContext.data.value === 'app-navegante-ios' && (
					<Button component={Link} href={URLS.app_navegante.apple_app_store.prod}>
						{t('actions.update_ios')}
					</Button>
				)}
				{/* <Button onClick={handleClose} variant="secondary">
					{t('actions.close')}
				</Button> */}
			</div>
		</div>
	);

	//
}
