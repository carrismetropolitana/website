'use client';

/* * */

import Button from '@/components/common/Button';
import Form from '@/components/contacts/Form';
import Section from '@/components/layout/Section';
import { IconsCommon } from '@/utils/assets';
import { IconBrandInstagram, IconBrandWhatsapp, IconMessage, IconPhone, IconUmbrella } from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
			<Section heading={t('heading')} withTopBorder={false} />
			<Section childrenWrapperStyles={styles.section} withChildrenNudge={true} withChildrenPadding={true} withTopBorder={false} withTopPadding={false}>
				<div className={styles.sectionHeader}>{t('phone_line')}</div>
				<div className={styles.sectionContent}>{t('phone_line_description')}</div>
				<Button href="tel:+351210418800" icon={<IconPhone size={18} />} label="210 418 800" />
				<Button href="/complaints" icon={<IconMessage size={18} />} label={t('by_form')} />
				<Button href="https://whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K" icon={<IconBrandWhatsapp size={18} />} label={t('by_whatsapp')} />
				<Button href="https://www.instagram.com/carrismetropolitana/" icon={<IconBrandInstagram size={18} />} label={t('by_instagram')} />
			</Section>
			<Section childrenWrapperStyles={styles.section} withChildrenNudge={true} withChildrenPadding={true} withTopPadding={false}>
				<div className={styles.sectionHeader}>{t('operators')}</div>
				<div className={styles.sectionContent}>{t('operators_description')}</div>
				<Button href="tel:+351210410400" icon={<IconPhone size={18} />} label="210 410 400" />
				<Button href="/lost-and-found" icon={<IconUmbrella size={18} />} label={t('lost_found')} />
			</Section>
			<Section withTopBorder={false} withTopPadding={false}>
				<Image alt={t('heading')} height={500} src={IconsCommon.AML_MAP_OPERATORS} style={{ width: '100%' }} width={500} />
			</Section>
			<Section heading={t('form.heading')} subheading={t('form.subheading')} withChildrenPadding>
				<Form />
			</Section>
		</>
	);

	//
}
