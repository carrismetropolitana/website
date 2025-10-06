/* * */

import { type ComplaintMetrics } from '@carrismetropolitana/api-types/metrics';
import { Text } from '@mantine/core';
import { IconAt, IconPhoneCheck } from '@tabler/icons-react';
import { Dates } from '@tmlmobilidade/utils';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	allData: ComplaintMetrics[]
	totalPassengersLastYear: number
}

/* * */

export function MetricsPageComplaintsGlobalCard({ allData, totalPassengersLastYear }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageComplaintsGlobalCard');

	//
	// B. Render components

	const renderTotalPassegersLastYear = () => {
		return (
			<div>
				<Text className={styles.totalPassengersContactsValue}>{t('total_passengers_day', { value: totalPassengersLastYear })}</Text>
				<Text className={styles.totalPassengersContactsDescription}>{t('total_passengers_day_contacts_desc')}</Text>
			</div>
		);
	};

	const renderTotalContacts = () => {
		const totalContactsLastWeekSum = allData.reduce((acc, item) => acc + item.total, 0);
		return (
			<div>
				<Text className={styles.totalContactsValue}>{t('total_contacts_phone', { value: totalContactsLastWeekSum })}</Text>
				<Text className={styles.totalContactsDescription}>{t('total_contacts_desc')}</Text>
			</div>
		);
	};

	const renderTotalPhoneContacts = () => {
		const totalPhoneContactsLastWeekSum = allData.reduce((acc, item) => acc + item.phone, 0);
		return (
			<div className={styles.totalPhoneContactsValuesWrapper}>
				<div className={styles.iconContainer}>
					<IconPhoneCheck className={styles.icon} size={50} />
				</div>
				<span>
					<Text className={styles.totalPhoneContactsValue}>{t('total_contacts_phone', { value: totalPhoneContactsLastWeekSum })}</Text>
					<Text className={styles.totalPhoneContactsDescription}>{t('total_phone_contacts_desc')}</Text>
				</span>
			</div>
		);
	};

	const renderTotalEmailContacts = () => {
		const totalEmailContactsLastWeekSum = allData.reduce((acc, item) => acc + item.email, 0);
		return (
			<div className={styles.totalEmailContactsValuesWrapper}>
				<div className={styles.iconContainer}>
					<IconAt className={styles.icon} size={50} />
				</div>
				<span>
					<Text className={styles.totalEmailContactsValue}>{t('total_contacts_email', { value: totalEmailContactsLastWeekSum })}</Text>
					<Text className={styles.totalEmailContactsDescription}>{t('total_email_contacts_desc')}</Text>
				</span>
			</div>
		);
	};

	//
	// C. Render components

	return (
		<>

			<div className={styles.container}>
				<div className={styles.globalCardFirstRow}>
					{renderTotalPassegersLastYear()}
					{renderTotalContacts()}
				</div>
				<div className={styles.globalCardSecondRow}>
					{renderTotalPhoneContacts()}
					{renderTotalEmailContacts()}
				</div>
			</div>

			{allData?.length > 0 && <p className={styles.lastUpdatedDate}>{t('last_updated', { value: Dates.fromOperationalDate(allData[0].last_update, 'Europe/Lisbon').js_date })}</p>}

		</>
	);

	//
}
