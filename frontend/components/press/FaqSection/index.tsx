'use client';

import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Section } from '../../layout/Section';
import { Surface } from '../../layout/Surface';
import styles from './styles.module.css';

export default function Component() {
	const t = useTranslations('press.Page.faq');

	const items = t.raw('faqs').map((faq: { answer: string, question: string }) => ({
		content: <div dangerouslySetInnerHTML={{ __html: faq.answer }} />,
		label: faq.question,
	}));

	return (
		<Surface>
			<Section heading={t('heading')} withPadding>
				<Accordion defaultValue={items[0].label} w="100%">
					{items.map(item => (
						<Accordion.Item key={item.label} value={item.label}>
							<Accordion.Control>{item.label}</Accordion.Control>
							<Accordion.Panel className={styles.panel}>{item.content}</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</Section>
		</Surface>
	);
}
