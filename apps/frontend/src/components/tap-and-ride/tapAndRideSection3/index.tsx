'use client';

/* * */

import Button from '@/components/common/Button';
import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideDataSection3 } from '../_data/data';

/* * */

export function TapAndRideSection3() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');
	const [invoicesItem, invoiceEditItem] = tapAndRideDataSection3;

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Faturas.png"
			items={tapAndRideDataSection3 ? [{
				id: invoicesItem.id,
				panel: (
					<>
						<div className={styles.invoicesContentContainer}>
							<p className={styles.content}>{t(invoicesItem.content)}</p>
						</div>
						<div className={styles.invoiceEditContentContainer}>
							<p className={styles.title}>{t(invoiceEditItem.title)}</p>
							<p className={styles.content}>{t(invoiceEditItem.content)}</p>
							<p>{t(invoiceEditItem.subcontent)}</p>
						</div>
						<Button className={styles.button} icon={<IconExternalLink size={18} />} label={t('Section3.invoice_edit.buttonLabel')} />
					</>
				),
				title: t(invoicesItem.title),
			}] : []}
		/>
	);
}
