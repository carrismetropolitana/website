'use client';

/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

import Button from '@/components/common/Button';
import FaqList from '@/components/faq/FaqList';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconPhoneCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('faq.Page');

	//
	// B. Fetch data

	const { data: allFaqData } = useSWR<FaqGroupByTopic[]>('/api/faq');

	//
	// C. Render components

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<Button icon={<IconPhoneCheck size={18} />} label={t('contacts')} />
				</Section>
			</Surface>
			{allFaqData && <FaqList data={allFaqData} />}
		</>
	);

	//
}
