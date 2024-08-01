'use client';

/* * */

import ButtonDefault from '@/components/common/ButtonDefault';
import StoresStoreItemRealtime from '@/components/stores/StoreItemRealtime';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface StoreItemProps {
	data: EncmProps
}

interface EncmProps {
	active_counters: number
	address: string
	currently_waiting: number
	expected_wait_time: number
	hours_friday: string[]
	hours_monday: string[]
	hours_saturday: string[]
	hours_special: string
	hours_sunday: string[]
	hours_thursday: string[]
	hours_tuesday: string[]
	hours_wednesday: string[]
	id: string
	is_open: boolean
	lat: number
	locality: string
	lon: number
	municipality_id: string
	municipality_name: string
	name: string
	parish_id: string
	parish_name: string
	phone: string
	postal_code: string
	region_id: string
	region_name: string
	short_name: string
}

/* * */

export default function Component({ data }: StoreItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('StoresStoreItem');

	//
	// B. Transform data

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
			<h3 className={styles.storeTitle}>{data.name}</h3>
			<StoresStoreItemRealtime data={data} />
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
			<ButtonDefault icon={<IconMap size={18} />} label="Ver no Mapa" />
		</div>
	);

	//
}
