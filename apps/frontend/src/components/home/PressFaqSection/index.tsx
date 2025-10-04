import type { Faq } from '@/types/faq.types';

import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from '../PressLabelSection/styles.module.css';

const SectionHeader = () => {
	const t = useTranslations('home.PressFaqSection');
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
	const t = useTranslations('home.PressFaqSection');

	const data: Faq[] = [
		{
			_id: '1',
			body: t('faqs.carris_relationship.answer'),
			title: t('faqs.carris_relationship.question'),
		},
		{
			_id: '2',
			body: t('faqs.operating_municipalities.answer'),
			title: t('faqs.operating_municipalities.question'),
		},
		{
			_id: '3',
			body: t('faqs.service_operators.answer'),
			title: t('faqs.service_operators.question'),
		},
		{
			_id: '4',
			body: t('faqs.open_data_access.answer'),
			title: t('faqs.open_data_access.question'),
		},
		{
			_id: '5',
			body: t('faqs.commercial_use.answer'),
			title: t('faqs.commercial_use.question'),
		},
		{
			_id: '6',
			body: t('faqs.contact_interviews.answer'),
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
