'use client';

/* * */

import AppButton from '@/components/common/AppButton';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { appAndroidStoreUrl, appIosStoreUrl } from '@/settings/urls.settings';
import { Link } from '@/i18n/routing';
import { Button } from '@mantine/core';
import { IconArrowBigUpLinesFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app.StartupMessages1');
	const environmentContext = useEnvironmentContext();

	//
	// B. Handle actions

	const handleClose = () => {
		if (environmentContext === 'app-ios') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).webkit.messageHandlers.closeButtonClicked.postMessage();
		}
		if (environmentContext === 'app-android') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).Android.closeButtonClicked();
		}
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<IconArrowBigUpLinesFilled className={styles.icon} />
				<h1 className={styles.heading}>{t('heading')}</h1>
				<h2 className={styles.subheading}>{t('subheading')}</h2>
				<p className={styles.text}>{t('text')}</p>
			</div>
			<div className={styles.actionsWrapper}>
				{environmentContext === 'app-ios' && (
					<Button component={Link} href={appIosStoreUrl}>
						{t('actions.update_ios')}
					</Button>
				)}
				{environmentContext === 'app-android' && (
					<Button component={Link} href={appAndroidStoreUrl}>
						{t('actions.update_android')}
					</Button>
				)}
				<AppButton label={t('actions.close')} onClick={handleClose} variant="muted" />
			</div>
		</div>
	);

	//
}
