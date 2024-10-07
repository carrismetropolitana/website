'use client';

/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

import GroupedListItem from '@/components/layout/GroupedListItem';
import { Surface } from '@/components/layout/Surface';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface FaqListProps {
	data: FaqGroupByTopic[]
}

/* * */

export default function Component({ data }: FaqListProps) {
	//

	//
	// A, Setup variables

	const t = useTranslations('faq.FaqList');

	//
	// B. Render components

	return (
		<Surface>
			{data.map(faqGroup => (
				<GroupedListItem key={faqGroup._id} label={t('label')} title={faqGroup.title}>
					<Accordion>
						{faqGroup.items.map(topicItem => (
							<Accordion.Item key={topicItem._id} value={topicItem.title}>
								<Accordion.Control>{topicItem.title}</Accordion.Control>
								<Accordion.Panel>
									<div className={styles.innerWrapper}>
										<div dangerouslySetInnerHTML={{ __html: topicItem.body }} />
									</div>
								</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
				</GroupedListItem>
			))}
		</Surface>
	);

	//
}
