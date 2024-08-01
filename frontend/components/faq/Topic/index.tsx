'use client';

/* * */

import { Accordion } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import { FAQItem } from 'app/api/faq/route';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface FaqTopicProps {
	topicItems: FAQItem[]
}

/* * */

export default function Component({ topicItems }: FaqTopicProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FaqTopic');

	//
	// B. Render components

	return (
		<Accordion
			chevron={<IconCaretLeftFilled />}
			classNames={{
				chevron: styles.accordionChevron,
				content: styles.accordionContent,
				control: styles.accordionControl,
				item: styles.accordionItem,
				label: styles.accordionLabel,
				root: styles.accordionRoot,
			}}
		>
			{topicItems.map(topicItem => (
				<Accordion.Item key={topicItem._id} value={topicItem.title}>
					<Accordion.Control>{topicItem.title}</Accordion.Control>
					<Accordion.Panel>
						<div dangerouslySetInnerHTML={{ __html: topicItem.body }} />
					</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion>
	);

	//
}
