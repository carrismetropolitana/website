/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

import { fetchFaqs } from '@/actions/faq.actions';
import Button from '@/components/common/Button';
import FaqList from '@/components/faq/FaqList';
import { Section } from '@/components/layout/Section';
import { IconPhoneCheck } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

/* * */

export default async function Component() {
	//

	//
	// A. Setup variables

	const t = await getTranslations('faq.Page');

	//
	// B. Fetch data

	const allFaqData: FaqGroupByTopic[] = await fetchFaqs();

	//
	// C. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<Button icon={<IconPhoneCheck size={18} />} label={t('contacts')} />
			</Section>
			<Section withTopPadding>
				<FaqList data={allFaqData} />
			</Section>
		</>
	);

	//
}
