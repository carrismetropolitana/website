'use client';

import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core';
/* * */

import { Section } from '@/components/layout/Section';

import styles from './styles.module.css';

/* * */

export function TapAndRideSectionFaqs() {
	//

	//
	// B. Render components

	return (
		<Section withPadding>
			<Accordion className={styles.accordion}>
				{/* {data.map(item => renderAccordionItem(item))} */}
				<AccordionItem className={styles.accordionItem} value="faqs-accordion">
					<AccordionControl>FAQS</AccordionControl>
					<AccordionPanel><div>FAQS </div></AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Section>
	);
}
