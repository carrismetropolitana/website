'use client';

import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core';
/* * */

import { Section } from '@/components/layout/Section';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import { tapAndRideData } from '../_data/data';

/* * */

export function TapAndRideSection1() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');
	const [whatIsItem, whereAvailableItem] = tapAndRideData;

	//
	// B. Render components

	return (
		<Section withPadding>
			<Image alt="Tap and Ride" src="/assets/tap-and-ride/what_is_banner.svg" />
			<Accordion className={styles.accordion}>
				{whatIsItem && (
					<AccordionItem value={whatIsItem.id}>
						<AccordionControl><span className={styles.accordionControl}>{t(whatIsItem.title)}</span></AccordionControl>
						<AccordionPanel>
							<div>{t(whatIsItem.content)}</div>
							{whereAvailableItem && (
								<>
									<div className={styles.accordionControl}>{t(whereAvailableItem.title)}</div>
									<div>{t(whereAvailableItem.content)}</div>
									{whereAvailableItem.subcontent && <div>{t(whereAvailableItem.subcontent)}</div>}
								</>
							)}
						</AccordionPanel>
					</AccordionItem>
				)}
			</Accordion>
		</Section>
	);
}
