'use client';

/* * */

import { Accordion } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import { FAQItem } from 'app/api/faq/route';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface FaqTopicProps {
	title: string
	topicItems: FAQItem[]
}

/* * */

export default function Component({ title, topicItems }: FaqTopicProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FaqTopic');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.topicHeader}>
				<h6 className={styles.topicLabel}>{t('label')}</h6>
				<h2 className={styles.topicTitle}>{title}</h2>
			</div>
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
		</div>
	);

	//
}
