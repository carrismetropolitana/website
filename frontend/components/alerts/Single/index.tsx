'use client';

/* * */

import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertIcon';
import Section from '@/components/layout/Section';
import { useAlertsContext } from '@/contexts/alerts.context';
import { Image } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ alert_id }) {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();
	const t = useTranslations('alerts.Page');
	const alertsContext = useAlertsContext();

	//
	// B. Transform data

	const simplifiedAlertData = useMemo(() => {
		if (!alertsContext.data.raw) return null;
		// Find the alert by ID
		const data = alertsContext.data.raw.find(item => item._id === alert_id);
		if (!data) return null;
		// Find the localized header text
		let localizedHeaderText: string;
		const headerTextLocaleMatch = data.headerText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!headerTextLocaleMatch) localizedHeaderText = data.headerText.translation[0].text;
		else localizedHeaderText = headerTextLocaleMatch.text;
		// Find the localized description text
		let localizedDescriptionText: string;
		const descriptionTextLocaleMatch = data.descriptionText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!descriptionTextLocaleMatch) localizedDescriptionText = data.descriptionText.translation[0].text;
		else localizedDescriptionText = descriptionTextLocaleMatch.text;
		// Find the localized image URL
		let localizedImageUrl: null | string;
		if (!data.image || !data.image.localizedImage?.length) return null;
		const imageLocaleMatch = data.image.localizedImage.find(item => item.language === currentLocale.split('-')[0]);
		if (!imageLocaleMatch) localizedImageUrl = data.image.localizedImage[0].url.length > 0 ? data.image.localizedImage[0].url : null;
		else localizedImageUrl = imageLocaleMatch.url.length > 0 ? imageLocaleMatch.url : null;
		//
		return {
			_id: alert_id,
			cause: data.cause,
			description: localizedDescriptionText,
			effect: data.effect,
			image_url: localizedImageUrl,
			title: localizedHeaderText,
		};
		//
	}, [alertsContext.data.raw]);

	//
	// C. Render components

	return (
		<>
			<Section backButtonHref="/alerts" heading={simplifiedAlertData?.title} withTopBorder={false} withChildrenPadding>
				<div className={styles.infoBar}>
					{simplifiedAlertData?.cause && <AlertCauseIcon cause={simplifiedAlertData.cause} withText />}
					{simplifiedAlertData?.effect && <AlertEffectIcon effect={simplifiedAlertData.effect} withText />}
					{/* <p className={styles.activePeriod}>{t.rich('active_period', { end: endDate, important: chunks => <strong>{chunks}</strong>, start: startDate })}</p> */}
				</div>
			</Section>
			<Section withChildrenPadding>
				{simplifiedAlertData?.description}
				{simplifiedAlertData?.image_url && <Image alt={simplifiedAlertData?.title} src={simplifiedAlertData.image_url} />}
			</Section>
		</>
	);

	//
}
