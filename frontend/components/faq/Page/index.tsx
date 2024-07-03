/* * */

import BackLayout from '@/components/layout/BackLayout';
import { Button } from '@mantine/core';
import { IconPhoneCheck } from '@tabler/icons-react';
import { FAQs, fetchFaqs } from 'app/api/faq/route';
import { getTranslations } from 'next-intl/server';

import Section from '../Section';
import styles from './styles.module.css';

/* * */

export default async function Component() {
	const t = await getTranslations('faq');
	const faqs: FAQs = await fetchFaqs();
	return (
		<BackLayout>
			<div className={styles.header}>
				<h1>
					{t('title')}
				</h1>
				<p>
					{t('description')}
				</p>
				<Button className={styles.btn} leftSection={<IconPhoneCheck />}>{t('contacts')}</Button>
			</div>
			<div className={styles.separator} />
			{faqs.map(faq => (
				<Section key={faq.title} items={faq.items} title={faq.title} />
			))}

		</BackLayout>
	);
}
