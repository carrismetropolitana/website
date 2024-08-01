/* * */

import ButtonDefault from '@/components/common/ButtonDefault';
import FaqTopic from '@/components/faq/Topic';
import GroupedListItem from '@/components/layout/GroupedListItem';
import Section from '@/components/layout/Section';
import { IconPhoneCheck } from '@tabler/icons-react';
import { FAQs, fetchFaqs } from 'app/api/faq/route';
import { getTranslations } from 'next-intl/server';

/* * */

export default async function Component() {
	//

	//
	// A. Setup variables

	const t = await getTranslations('FaqPage');

	//
	// B. Fetch data

	const allFaqData: FAQs = await fetchFaqs();

	//
	// C. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<ButtonDefault icon={<IconPhoneCheck size={18} />} label={t('contacts')} />
			</Section>
			<Section withTopPadding>
				{allFaqData.map(faqGroup => (
					<GroupedListItem key={faqGroup._id} label={t('grouped_list.label')} title={faqGroup.title}>
						<FaqTopic topicItems={faqGroup.items} />
					</GroupedListItem>
				))}
			</Section>
		</>
	);

	//
}
