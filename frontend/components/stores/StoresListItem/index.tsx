'use client';

/* * */

import type { Store } from '@/types/stores.types';

import ButtonDefault from '@/components/common/ButtonDefault';
import StoresListItemRealtime from '@/components/stores/StoresListItemRealtime';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface StoresListItemProps {
	data: Store
}

/* * */

export default function Component({ data }: StoresListItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListItem');

	//
	// B. Transform data

	const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${data.name}&destination_place_id=${data.google_place_id}`;

	const parsedSchedules = useMemo(() => {
		//
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const openHoursArray: any[] = [];

		//
		if (data.hours_monday?.length > 0) openHoursArray.push({ day: 'mon', hours: data.hours_monday });
		if (data.hours_tuesday?.length > 0) openHoursArray.push({ day: 'tue', hours: data.hours_tuesday });
		if (data.hours_wednesday?.length > 0) openHoursArray.push({ day: 'wed', hours: data.hours_wednesday });
		if (data.hours_thursday?.length > 0) openHoursArray.push({ day: 'thu', hours: data.hours_thursday });
		if (data.hours_friday?.length > 0) openHoursArray.push({ day: 'fri', hours: data.hours_friday });
		if (data.hours_saturday?.length > 0) openHoursArray.push({ day: 'sat', hours: data.hours_saturday });
		if (data.hours_sunday?.length > 0) openHoursArray.push({ day: 'sun', hours: data.hours_sunday });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const resultArray: any[] = [];

		for (const daySchedule of openHoursArray) {
			//
			const arrayIndex = resultArray.findIndex(item => item.hours.join(',') === daySchedule.hours.join(','));
			//
			if (arrayIndex < 0) {
				resultArray.push({ first_day: daySchedule.day, hours: daySchedule.hours, last_day: null });
			}
			else {
				resultArray[arrayIndex].last_day = daySchedule.day;
			}
		}

		const parsedSchedulesResult = resultArray.map((parsedHours) => {
			return {
				days: `${parsedHours.first_day ? t(`schedules.${parsedHours.first_day}`) : ''}${parsedHours.last_day ? '-' + t(`schedules.${parsedHours.last_day}`) : ''}`,
				hours: parsedHours.hours.join(' | '),
			};
		});

		return parsedSchedulesResult;
		//
	}, [t, data.hours_monday, data.hours_tuesday, data.hours_wednesday, data.hours_thursday, data.hours_friday, data.hours_saturday, data.hours_sunday]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.storeBrand}>{data.brand_name}</h3>
				<h3 className={styles.storeName}>{data.short_name}</h3>
			</div>
			<StoresListItemRealtime data={data} />
			<div className={styles.infoGroupWrapper}>
				<p className={styles.label}>{t('schedules.label')}</p>
				{parsedSchedules.map(item => (
					<p key={item.days} className={styles.value}>{item.days} {item.hours}</p>
				))}
			</div>
			<div className={styles.infoGroupWrapper}>
				<p className={styles.label}>{t('address')}</p>
				<p className={styles.value}>{data.address}</p>
				<p className={styles.value}>{data.postal_code} {data.locality}</p>
			</div>
			<ButtonDefault href={googleMapsDirectionsUrl} icon={<IconMap size={18} />} label={t('get_directions')} target="_blank" />
		</div>
	);

	//
}
