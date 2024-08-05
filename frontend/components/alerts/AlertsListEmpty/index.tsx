'use client';

/* * */

import Button from '@/components/common/Button';
import { useAlertsContext } from '@/contexts/alerts.context';
import { IconExternalLink, IconEye, IconSunset2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListEmpty');
	const alertsContext = useAlertsContext();

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconSunset2 className={styles.icon} size={50} />
			<h1 className={styles.title}>{t('default.title')}</h1>
			<h2 className={styles.subtitle}>{t('default.subtitle')}</h2>
			<div className={styles.actionWrapper}>
				<Button icon={<IconEye size={18} />} label={t('default.action_1')} onClick={() => alertsContext.actions.updateFilterByDate('current')} />
				<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('default.action_2')} target="_blank" />
			</div>
		</div>
	);

	//
}
