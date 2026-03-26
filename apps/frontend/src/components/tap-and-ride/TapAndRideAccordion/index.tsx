'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Image } from '@mantine/core';
import { type ReactNode, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface TapAndRideAccordionItemProps {
	id: string
	panel: ReactNode
	title: ReactNode
}

interface TapAndRideAccordionProps {
	imageAlt: string
	imageSrc: string
	items: TapAndRideAccordionItemProps[]
}

/* * */

export function TapAndRideAccordion({ imageAlt, imageSrc, items }: TapAndRideAccordionProps) {
	//
	const [openedItem, setOpenedItem] = useState<null | string>(null);

	// . Render components

	return (
		<Section withPadding>
			<Accordion className={styles.accordion} onChange={setOpenedItem} value={openedItem}>
				{items.map(item => (
					<AccordionItem key={item.id} className={styles.accordionItem} value={item.id}>
						{openedItem === item.id && <Image alt={imageAlt} className={styles.image} src={imageSrc} />}
						<AccordionControl><span className={styles.accordionControl}>{item.title}</span></AccordionControl>
						<AccordionPanel>
							{item.panel}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Section>
	);
}
