'use client';

/* * */

import Button from '@/components/common/Button';
import Form from '@/components/contacts/Form';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconPhone } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

export default function Component() {
//

	//
	// A. Setup variables

	const t = useTranslations('contacts.Page');

	//
	// B. Render components

	return (
		<>
			<Surface>
				<Section heading={t('heading')} withGap withPadding>
					<div className={styles.sectionHeader}>{t('phone_line')}</div>
					<div className={styles.sectionContent}>{t('phone_line_description')}</div>
					<Button href="tel:+351210418800" icon={<IconPhone size={18} />} label="210 418 800" />
				</Section>
				<Section withGap withPadding>
					<div className={styles.sectionHeader}>{t('operators')}</div>
					<div className={styles.sectionContent}>{t('operators_description')}</div>
					<Button href="tel:+351210410400" icon={<IconPhone size={18} />} label="210 410 400" />
					<Image alt={t('heading')} height={500} src="/assets/common/aml-map-with-operators.svg" style={{ width: '100%' }} width={500} />
				</Section>
			</Surface>
			<Surface>
				<Section heading={t('form.heading')} subheading={t('form.subheading')} withPadding>
					<Form />
				</Section>
			</Surface>
		</>
	);

	//
}
