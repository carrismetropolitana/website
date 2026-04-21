/* * */

import type { FaqTopicGroup } from '@/types/faq.types';
import type { LexicalNode } from '@/types/lexical-node.types';

import { GroupedListItem } from '@/components/layout/GroupedListItem';
import { Surface } from '@/components/layout/Surface';
import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { Accordion, AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	data: FaqTopicGroup[] | undefined
}

/* * */

export function FaqList({ data }: Props) {
	//

	//
	// A, Setup variables

	const t = useTranslations('faq.FaqList');
	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<>
			{data?.map((group, groupIndex) => {
				const groupKey = `${group.topicId}-${groupIndex}`;
				const groupTitle = group.topic?.title?.trim() || t('label');

				return (
					<Surface key={groupKey}>
						<GroupedListItem key={groupKey} label={t('label')} title={groupTitle}>
							<Accordion>
								{group.faqs.map((faq, faqIndex) => {
									const answerJSON = typeof faq.answer === 'string' ? JSON.parse(faq.answer) : faq.answer;
									const rootNode = answerJSON?.root as LexicalNode;
									const questionTitle = faq.question?.trim() || t('label');
									const itemValue = `${group.topicId}-${faq._id || faqIndex}`;
									return (
										<AccordionItem key={itemValue} value={itemValue}>
											<AccordionControl>{questionTitle}</AccordionControl>
											<AccordionPanel>
												<div className={styles.innerWrapper}>
													{rootNode && renderLexicalNode(rootNode)}
												</div>
											</AccordionPanel>
										</AccordionItem>
									);
								})}
							</Accordion>
						</GroupedListItem>
					</Surface>
				);
			})}
		</>

	);

	//
}
