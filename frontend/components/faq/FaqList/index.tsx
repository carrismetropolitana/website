'use client';

/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

import GroupedListItem from '@/components/layout/GroupedListItem';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

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
		data.map(faqGroup => (
			<GroupedListItem key={faqGroup._id} label={t('label')} title={faqGroup.title}>
				<Accordion>
					{faqGroup.items.map(topicItem => (
						<Accordion.Item key={topicItem._id} value={topicItem.title}>
							<Accordion.Control>{topicItem.title}</Accordion.Control>
							<Accordion.Panel>
								<div dangerouslySetInnerHTML={{ __html: topicItem.body }} />
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</GroupedListItem>
		))
	);

	//
}
