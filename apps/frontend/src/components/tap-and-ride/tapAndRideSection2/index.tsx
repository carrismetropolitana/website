'use client';
/* * */

import Button from '@/components/common/Button';
import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideDataSection2 } from '../_data/data';

/* * */

export function TapAndRideSection2() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Tarifas.png"
			items={tapAndRideDataSection2 ? [{
				id: tapAndRideDataSection2.id,
				panel: (
					<>
						<div className={styles.tarifsContentContainer}>
							{t(tapAndRideDataSection2.content)}
						</div>
						<div className={styles.subcontentContainer}>
							<p className={styles.subcontentText}>{t(tapAndRideDataSection2.subcontent)}</p>
						</div>
						<Button className={styles.button} icon={<IconExternalLink size={18} />} label={t('Section2.tarifs.buttonLabel')} />
					</>
				),
				title: t(tapAndRideDataSection2.title),
			}] : []}
		/>
	);
}
