'use client';
/* * */

import Button from '@/components/common/Button';
import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { Image } from '@mantine/core';
import { IconBook, IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideDataSection1 } from '../_data/data';

/* * */

export function TapAndRideSection1() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');
	const [whatIsItem, whereAvailableItem] = tapAndRideDataSection1;

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/CUT_Card1.png"
			items={[{
				id: whatIsItem.id,
				panel: (
					<>
						<div className={styles.whatIsContentContainer}>
							<p className={styles.content}>{t(whatIsItem.content)}</p>
						</div>
						<div className={styles.whereAvailableContentContainer}>
							<p className={styles.title}>{t(whereAvailableItem.title)}</p>
							<p className={styles.content}>{t(whereAvailableItem.content)}</p>
							<div className={styles.subcontentContainer}>
								<p className={styles.subcontentText}>{t(whereAvailableItem.subcontent)}</p>
								<Image className={styles.subcontentImage} fallbackSrc="/assets/common/placeholder.png" src="/assets/tap-and-ride/validator_tap-and-ride.png" />
								<p className={styles.subcontentText}>{t(whereAvailableItem.subcontent2)}</p>
								<Image className={styles.subcontentImage} fallbackSrc="/assets/common/placeholder.png" src="/assets/tap-and-ride/AF_CUT_Mapa.svg" />
								<Button className={styles.button} icon={<IconMap />} label={t('Section1.where_available.buttonLabel')} variant="primary" />
							</div>
						</div>

					</>
				),
				title: t(whatIsItem.title),
			}]}
		/>
	);
}
