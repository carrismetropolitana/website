/* * */

import FaqTopic from '@/components/faq/Topic';
import LayoutSection from '@/components/layout/Section';
import { Button } from '@mantine/core';
import { IconPhoneCheck } from '@tabler/icons-react';
import { FAQs, fetchFaqs } from 'app/api/faq/route';
import { getTranslations } from 'next-intl/server';

import styles from './styles.module.css';

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
			<LayoutSection heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<Button className={styles.btn} leftSection={<IconPhoneCheck />}>{t('contacts')}</Button>
			</LayoutSection>
			<LayoutSection withTopPadding>
				{allFaqData.map(faq => (
					<FaqTopic key={faq._id} title={faq.title} topicItems={faq.items} />
				))}
			</LayoutSection>
		</>
	);

	//
}
