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
	imageAlt?: string
	imageSrc?: string
	items: TapAndRideAccordionItemProps[]
	withBorder?: boolean
}

/* * */

export function TapAndRideAccordion({ imageAlt, imageSrc, items, withBorder = false }: TapAndRideAccordionProps) {
	//
	const [openedItem, setOpenedItem] = useState<null | string>(null);

	// . Render components

	return (
		<Section withPadding>
			<Accordion className={styles.accordion} onChange={setOpenedItem} value={openedItem}>
				{items.map((item) => {
					const isOpen = openedItem === item.id;
					const showImageInControl = isOpen && Boolean(imageSrc);

					return (
						<AccordionItem key={item.id} className={withBorder ? styles.withBorder : styles.accordionItem} value={item.id}>
							<AccordionControl>
								{showImageInControl
									? (
										<Image alt={imageAlt ?? ''} className={styles.image} src={imageSrc} />
									)
									: (
										<span className={styles.accordionControl}>{item.title}</span>
									)}
							</AccordionControl>
							<AccordionPanel>
								{showImageInControl ? (
									<>
										<div className={styles.panelTitleBelowControl}>{item.title}</div>
										{item.panel}
									</>
								) : (
									item.panel
								)}
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</Section>
	);
}
