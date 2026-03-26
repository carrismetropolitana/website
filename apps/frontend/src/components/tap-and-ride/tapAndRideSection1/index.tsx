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
	const data = tapAndRideData;

	//
	// B. Render components

	const renderAccordionItem = (item: { content: string, id: string, title: string }) => {
		return (
			<AccordionItem key={item.id} value={item.id}>
				<AccordionControl><span className={styles.accordionControl}>{t(item.title)}</span></AccordionControl>
				<AccordionPanel><div>{t(item.content)}</div></AccordionPanel>
			</AccordionItem>
		);
	};

	return (
		<Section withPadding>
			<Accordion className={styles.accordion}>
				<Image alt="Tap and Ride" src="/assets/tap-and-ride/what_is_banner.svg" />
				{data.map(item => renderAccordionItem(item))}
			</Accordion>
		</Section>
	);
}
