'use client';
/* * */

import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideDataSection5 } from '../_data/data';

/* * */

export function TapAndRideSection5() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Instrucoes_1.png"
			items={tapAndRideDataSection5 ? [{
				id: tapAndRideDataSection5.id,
				panel: (
					<>
						<p className={styles.content}>{t(tapAndRideDataSection5.content)}</p>
						<p className={styles.subcontent}>{t(tapAndRideDataSection5.subcontent)}</p>

					</>
				),
				title: t(tapAndRideDataSection5.title),
			}] : []}
		/>
	);
}
