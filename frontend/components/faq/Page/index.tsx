/* * */

import BackLayout from '@/components/layout/BackLayout';
import { Button } from '@mantine/core';
import { IconPhoneCheck } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

import Section from '../Section';
import styles from './styles.module.css';

/* * */

export default async function Component() {
	const t = await getTranslations('faq');
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
			<Section />
			<Section />
			<Section />

		</BackLayout>
	);
}
