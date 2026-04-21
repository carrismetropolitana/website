'use client';

import type { PressFaqItem } from '@/types/press-faq.types';

import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from '../PressLabelSection/styles.module.css';

const SectionHeader = () => {
	const t = useTranslations('press.FaqSection');
	return (
		<div className={styles.pressLabelSectionHeader}>
			<h1>{t('section_heading')}</h1>
			<p>
				{t('subheading')}
			</p>
		</div>
	);
};

export function PressFaqSection() {
	const t = useTranslations('press.FaqSection');

	const toHtml = (text: string) => text.split('\n\n').map(p => `<p>${p}</p>`).join('');

	const data: PressFaqItem[] = [
		{
			_id: '1',
			body: toHtml(t('faqs.operating_municipalities.answer')),
			title: t('faqs.operating_municipalities.question'),
		},
		{
			_id: '2',
			body: toHtml(t('faqs.service_operators.answer')),
			title: t('faqs.service_operators.question'),
		},
		{
			_id: '3',
			body: toHtml(t('faqs.open_data_access.answer')),
			title: t('faqs.open_data_access.question'),
		},
		{
			_id: '4',
			body: toHtml(t('faqs.carris_relationship.answer')),
			title: t('faqs.carris_relationship.question'),
		},
		{
			_id: '5',
			body: toHtml(t('faqs.commercial_use.answer')),
			title: t('faqs.commercial_use.question'),
		},
		{
			_id: '6',
			body: toHtml(t('faqs.contact_interviews.answer')),
			title: t('faqs.contact_interviews.question'),
		},
	];

	return (
		<section className={styles.pressLabelSectionWrapper}>
			<SectionHeader />

			<Accordion w="100%">
				{data.map(faq => (
					<AccordionItem key={faq._id} value={faq.title}>
						<AccordionControl>{faq.title}</AccordionControl>
						<AccordionPanel>
							<div className={styles.innerWrapper} dangerouslySetInnerHTML={{ __html: faq.body }} />
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
