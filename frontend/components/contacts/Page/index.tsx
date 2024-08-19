'use client';
/* * */

import Button from '@/components/common/Button';
import Section from '@/components/layout/Section';
import { IconBrandInstagram, IconBrandWhatsapp, IconMessage, IconPhone, IconUmbrella } from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	const t = useTranslations('contacts');

	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} />
			<Section childrenWrapperStyles={styles.section} withChildrenNudge={true} withChildrenPadding={true} withTopBorder={false} withTopPadding={false}>
				<div className={styles.sectionHeader}>{t('phone_line')}</div>
				<div className={styles.sectionContent}>{t('phone_line_description')}</div>

				<Button href="tel:+351210418800" icon={<IconPhone size={18} />} label="210 418 800" />
				<Button href="/complaints" icon={<IconMessage size={18} />} label={t('by_form')} />
				<Button
					icon={<IconBrandWhatsapp size={18} />}
					label={t('by_whatsapp')}
					href="https://whatsapp.com/channel/0029Va9z9d2JP2184daqbX0K
 "
				/>
				<Button href="https://www.instagram.com/carrismetropolitana/" icon={<IconBrandInstagram size={18} />} label={t('by_instagram')} />
			</Section>
			<Section childrenWrapperStyles={styles.section} withChildrenNudge={true} withChildrenPadding={true} withTopPadding={false}>
				<div className={styles.sectionHeader}>{t('operators')}</div>
				<div className={styles.sectionContent}>{t('operators_description')}</div>

				<Button href="tel:+351210410400" icon={<IconPhone size={18} />} label="210 410 400" />
				<Button href="/lost-and-found" icon={<IconUmbrella size={18} />} label={t('lost_found')} />
			</Section>
			<Image alt={t('heading')} height={500} src="/images/aml-map.svg" style={{ width: '100%' }} width={500} />
		</>
	);
}
