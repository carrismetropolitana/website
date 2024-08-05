'use client';

/* * */

import type { Alert } from '@/types/alerts.types';

import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { Accordion } from '@mantine/core';
import { IconAccessibleFilled, IconAlertHexagonFilled, IconArrowBigUpLinesFilled, IconArrowFork, IconArrowUpRight, IconCircleArrowDownFilled, IconClockExclamation, IconInfoCircleFilled, IconInfoTriangleFilled } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

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

	const alertIcon = useMemo(() => {
		switch (data.effect) {
			case 'ACCESSIBILITY_ISSUE':
				return <IconAccessibleFilled color="var(--color-alerts-0)" size={20} />;
			case 'ADDITIONAL_SERVICE':
				return <IconArrowBigUpLinesFilled color="var(--color-alerts-1)" size={20} />;
			case 'DETOUR':
				return <IconArrowFork color="var(--color-alerts-2)" size={20} />;
			case 'MODIFIED_SERVICE':
				return <IconInfoCircleFilled color="var(--color-alerts-0)" size={20} />;
			case 'NO_SERVICE':
				return <IconAlertHexagonFilled color="var(--color-alerts-3)" size={20} />;
			case 'REDUCED_SERVICE':
				return <IconCircleArrowDownFilled color="var(--color-alerts-2)" size={20} />;
			case 'SIGNIFICANT_DELAYS':
				return <IconClockExclamation color="var(--color-alerts-3)" size={20} />;
			default:
				return <IconInfoTriangleFilled color="var(--color-alerts-2)" size={20} />;
		}
	}, [data.effect]);

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

	const startDateString = useMemo(() => {
		const startDate = data.activePeriod[0].start ? data.activePeriod[0].start : -Infinity;
		return DateTime.fromSeconds(startDate).toLocaleString(DateTime.DATE_FULL);
	}, [data.activePeriod]);

	const endDateString = useMemo(() => {
		const endDate = data.activePeriod[0].end ? data.activePeriod[0].end : +Infinity;
		return DateTime.fromSeconds(endDate).toLocaleString(DateTime.DATE_FULL);
	}, [data.activePeriod]);

	//
	// C. Render components

	return (
		<Accordion.Item value={data._id}>
			<Accordion.Control icon={alertIcon}>{localizedHeaderText} ({startDateString} -› {endDateString})</Accordion.Control>
			<Accordion.Panel classNames={{ content: styles.contentWrapper }}>
				<p className={styles.description}>{startDateString} -› {endDateString}</p>
				<p className={styles.description}>{localizedDescriptionText}</p>
				{localizedImageUrl && <AlertsListItemImageThumbnail alt={localizedHeaderText} href={alertHref} src={localizedImageUrl} />}
				<Button href={alertHref} icon={<IconArrowUpRight size={16} />} label={t('open')} variant="pill" />
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
