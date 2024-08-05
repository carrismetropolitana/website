'use client';

/* * */

import type { Alert } from '@/types/alerts.types';

import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { Accordion } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { AlertEffectIcon } from '../AlertIcon';
import styles from './styles.module.css';

/* * */

interface AlertsListItemProps {
	data: Alert
}

/* * */

export default function Component({ data }: AlertsListItemProps) {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();
	const t = useTranslations('alerts.AlertsListItem');

	//
	// B. Transform data

	const alertHref = `/alerts/${data._id}`;

	const localizedHeaderText = useMemo(() => {
		const headerTextLocaleMatch = data.headerText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!headerTextLocaleMatch) return data.headerText.translation[0].text;
		else return headerTextLocaleMatch.text;
	}, [data.headerText]);

	const localizedDescriptionText = useMemo(() => {
		const descriptionTextLocaleMatch = data.descriptionText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!descriptionTextLocaleMatch) return data.descriptionText.translation[0].text;
		else return descriptionTextLocaleMatch.text;
	}, [data.descriptionText]);

	const localizedImageUrl = useMemo(() => {
		if (!data.image || !data.image.localizedImage?.length) return null;
		const imageLocaleMatch = data.image.localizedImage.find(item => item.language === currentLocale.split('-')[0]);
		if (!imageLocaleMatch) return data.image.localizedImage[0].url.length > 0 ? data.image.localizedImage[0].url : null;
		else return imageLocaleMatch.url.length > 0 ? imageLocaleMatch.url : null;
	}, [data.image]);

	const startDate = useMemo(() => {
		const startDate = data.activePeriod[0].start ? data.activePeriod[0].start : -Infinity;
		return DateTime.fromSeconds(startDate).toJSDate();
	}, [data.activePeriod]);

	const endDate = useMemo(() => {
		const endDate = data.activePeriod[0].end ? data.activePeriod[0].end : +Infinity;
		return DateTime.fromSeconds(endDate).toJSDate();
	}, [data.activePeriod]);

	//
	// C. Render components

	return (
		<Accordion.Item value={data._id}>
			<Accordion.Control icon={<AlertEffectIcon effect={data.effect} />}>{localizedHeaderText}</Accordion.Control>
			<Accordion.Panel classNames={{ content: styles.contentWrapper }}>
				<p className={styles.activePeriod}>{t.rich('active_period', { end: endDate, important: chunks => <strong>{chunks}</strong>, start: startDate })}</p>
				<p className={styles.description}>{localizedDescriptionText}</p>
				{localizedImageUrl && <AlertsListItemImageThumbnail alt={localizedHeaderText} href={alertHref} src={localizedImageUrl} />}
				<Button href={alertHref} icon={<IconArrowUpRight size={16} />} label={t('open')} variant="pill" />
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
