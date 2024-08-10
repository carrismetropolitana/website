'use client';

/* * */

import Button from '@/components/common/Button';
import { useStoresListContext } from '@/contexts/StoresList.context';
import { IconExternalLink, IconEye, IconMap, IconSunset2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListEmpty');
	const storesContext = useStoresListContext();

	//
	// D. Render Components

	if (storesContext.filters.by_municipality) {
		return (
			<div className={styles.container}>
				<IconSunset2 className={styles.icon} size={50} />
				<h1 className={styles.title}>{t('by_municipality.title')}</h1>
				<h2 className={styles.subtitle}>{t('by_municipality.subtitle')}</h2>
				<div className={styles.actionWrapper}>
					<Button icon={<IconEye size={18} />} label={t('by_municipality.action_1')} onClick={() => storesContext.actions.updateFilterCurrentStatus('all')} />
					<Button
						icon={<IconMap size={18} />}
						label={t('by_municipality.action_2')}
						onClick={() => {
							storesContext.actions.updateFilterCurrentStatus('all');
							storesContext.actions.updateFilterByMunicipality('');
						}}
					/>
					<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('by_municipality.action_3')} target="_blank" />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<IconSunset2 className={styles.icon} size={50} />
			<h1 className={styles.title}>{t('default.title')}</h1>
			<h2 className={styles.subtitle}>{t('default.subtitle')}</h2>
			<div className={styles.actionWrapper}>
				<Button icon={<IconEye size={18} />} label={t('default.action_1')} onClick={() => storesContext.actions.updateFilterCurrentStatus('all')} />
				<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('default.action_2')} target="_blank" />
			</div>
		</div>
	);

	//
}
