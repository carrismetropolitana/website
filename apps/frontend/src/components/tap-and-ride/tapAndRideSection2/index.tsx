'use client';
/* * */

import Button from '@/components/common/Button';
import { TapAndRideContentSection } from '@/components/tap-and-ride/TapAndRideContentSection';
import { IconExternalLink } from '@tabler/icons-react';

import styles from './styles.module.css';

import { tapAndRideDataSection2 } from '../_data/data';

/* * */

export function TapAndRideSection2() {
	//

	//
	// A. Render components

	return (
		<TapAndRideContentSection
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Tarifas.png"
			item={tapAndRideDataSection2}
			renderPanel={(t, item) => (
				<div>
					<div className={styles.tarifsContentContainer}>
						{t(item.content)}
					</div>
					<div className={styles.subcontentContainer}>
						<p className={styles.subcontentText}>{t(item.subcontent)}</p>
					</div>
					<Button className={styles.button} icon={<IconExternalLink size={18} />} label={t('Section2.tarifs.buttonLabel')} />
				</div>
			)}
		/>
	);

	//
}
