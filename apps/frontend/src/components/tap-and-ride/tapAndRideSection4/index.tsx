'use client';
/* * */

import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideDataSection4 } from '../_data/data';

/* * */

export function TapAndRideSection4() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Fiscalizacao.png"
			items={tapAndRideDataSection4 ? [{
				id: tapAndRideDataSection4.id,
				panel: (
					<div className={styles.tarifsContentContainer}>
						<p className={styles.content}>{t(tapAndRideDataSection4.content)}</p>
					</div>
				),
				title: t(tapAndRideDataSection4.title),
			}] : []}
		/>
	);
}
