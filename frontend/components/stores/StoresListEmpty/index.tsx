'use client';

/* * */

import ButtonDefault from '@/components/common/ButtonDefault';
import { useStoresContext } from '@/contexts/stores.context';
import { IconExternalLink, IconEye, IconSunset2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListEmpty');
	const storesContext = useStoresContext();

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<IconSunset2 className={styles.icon} size={50} />
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
			<div className={styles.actionWrapper}>
				<ButtonDefault icon={<IconEye size={18} />} label={t('action_1')} onClick={() => storesContext.actions.updateFilterCurrentStatus('all')} />
				<ButtonDefault href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('action_2')} target="_blank" />
			</div>
		</div>
	);

	//
}
