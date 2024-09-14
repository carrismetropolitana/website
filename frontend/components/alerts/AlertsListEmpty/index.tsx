'use client';

/* * */

import Button from '@/components/common/Button';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import { IconCalendarEvent, IconDeviceMobileDown, IconSunset2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListEmpty');
	const alertsContext = useAlertsListContext();

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconSunset2 className={styles.icon} size={50} />
			<h1 className={styles.title}>{t('default.title')}</h1>
			<h2 className={styles.subtitle}>{t('default.subtitle')}</h2>
			<div className={styles.actionWrapper}>
				<Button icon={<IconCalendarEvent size={18} />} label={t('default.action_1')} onClick={() => alertsContext.actions.updateFilterByDate('current')} />
				<Button href="/app" icon={<IconDeviceMobileDown size={18} />} label={t('default.action_2')} />
			</div>
		</div>
	);

	//
}
