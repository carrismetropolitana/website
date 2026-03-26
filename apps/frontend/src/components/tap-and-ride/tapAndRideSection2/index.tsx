'use client';

import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideData } from '../_data/data';

/* * */

export function TapAndRideSection2() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');
	const [whatIsItem, whereAvailableItem] = tapAndRideData;

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/what_is_banner.svg"
			items={whatIsItem ? [{
				id: whatIsItem.id,
				panel: (
					<>
						<div className={styles.whatIsContentContainer}>{t(whatIsItem.content)}</div>
						<div className={styles.whereAvailableContentContainer}>
							<p className={styles.title}>{t(whereAvailableItem.title)}</p>
							<p className={styles.content}>{t(whereAvailableItem.content)}</p>
							<div className={styles.subcontentContainer}>{t(whereAvailableItem.subcontent)}</div>
						</div>

					</>
				),
				title: t(whatIsItem.title),
			}] : []}
		/>
	);
}
