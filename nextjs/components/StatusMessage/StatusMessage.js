'use client';

/* * */

import styles from './StatusMessage.module.css';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-react';
import { Link } from '@/translations/navigation';

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
					<ActionIcon variant='subtle' size='lg' className={styles.colapseIcon}>
						{isVisible ? <IconChevronDown size={20} /> : <IconChevronLeft size={20} />}
					</ActionIcon>
				</div>
				{isVisible &&
					<div className={styles.contentWrapper}>
						<p className={styles.explanation}>{t('explanation')}</p>
						<Link href='https://www.navegante.pt/destaques/o-navegante-nao-para-mas-nos-dias-13-e-14-de-abril-fara-uma-pausa' target='_blank' className={styles.moreInfo}>{t('more_info')}</Link>
						<p className={styles.solution}>{t('solution')}</p>
					</div>
				}
			</div>
		</div>
	);

	//
}