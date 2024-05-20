// 'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendAlertsItem.module.css';
// import FrontendAlertsSummary from '@/components/FrontendAlertsSummary/FrontendAlertsSummary';
import { Accordion } from '@mantine/core';
import Link from 'next/link';

/* * */

export default function FrontendAlertsItem({ header, description, type, url }) {
	//

	//
	// A. Setup variables
	let t = useTranslations('FrontendAlertsItem');

	//
	// C. Render components
	let iconName = 'OTHER_EFFECT';
	let possibleIcons = ['REDUCED_SERVICE'];
	if (possibleIcons.includes(type)) {
		iconName = type;
	}
	let icon = <img src={'/icons/alerts/' + iconName + '.svg'} alt='icon' className={styles.icon} />;
	return (
		<Accordion.Item value={header} className={styles.item} py={4} >
			<Accordion.Control icon={icon}>
				<h3>{header}</h3>
			</Accordion.Control>
			<Accordion.Panel>{description} <br/><Link prefetch={false} style={{ color: 'var(--info5)' }} href={url}>{t('show_more')}</Link></Accordion.Panel>
		</Accordion.Item>
	);

	//
}