'use client';

/* * */

import { Link } from '@/i18n/routing';
import { ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './StatusMessage.module.css';

/* * */

export default function StatusMessage() {
	//

	const STATUS_TYPE = 'ok'; // 'warning' || 'ok'

	//
	// A. Setup variables

	const t = useTranslations('StatusMessage');
	const [isVisible, setIsVisible] = useState(STATUS_TYPE === 'warning' ? true : false);

	//
	// B. Render components

	const handleSetIsVisible = () => {
		setIsVisible(prev => !prev);
	};

	//
	// C. Render components

	return (
		<div className={`${styles.container} ${styles[STATUS_TYPE]}`}>
			<div className={styles.innerWrapper}>
				<div className={styles.headerWrapper} onClick={handleSetIsVisible}>
					<h3 className={styles.title}>{t('title')}</h3>
					<ActionIcon className={styles.colapseIcon} size="lg" variant="subtle">
						{isVisible ? <IconChevronDown size={20} /> : <IconChevronLeft size={20} />}
					</ActionIcon>
				</div>
				{isVisible
				&& (
					<div className={styles.contentWrapper}>
						<p className={styles.explanation}>{t('explanation')}</p>
						<Link className={styles.moreInfo} href="https://www.navegante.pt/destaques/o-navegante-nao-para-mas-nos-dias-13-e-14-de-abril-fara-uma-pausa" target="_blank">{t('more_info')}</Link>
						<p className={styles.solution}>{t('solution')}</p>
					</div>
				)}
			</div>
		</div>
	);

	//
}
