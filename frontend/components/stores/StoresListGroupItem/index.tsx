'use client';

/* * */

import type { Store } from '@/types/stores.types';

import Button from '@/components/common/Button';
import StoresListGroupItemRealtime from '@/components/stores/StoresListGroupItemRealtime';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	isSelected: boolean
	onSelect: (storeId: string) => void
	storeData: Store
}

/* * */

export default function Component({ isSelected, onSelect, storeData }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListGroupItem');

	//
	// B. Transform data

	const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${storeData.name}&destination_place_id=${storeData.google_place_id}`;
	const appleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${storeData.name}&destination_place_id=${storeData.google_place_id}`;

	const parsedSchedules = useMemo(() => {
		//
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const openHoursArray: any[] = [];

		//
		if (storeData.hours_monday?.length > 0) openHoursArray.push({ day: 'mon', hours: storeData.hours_monday });
		if (storeData.hours_tuesday?.length > 0) openHoursArray.push({ day: 'tue', hours: storeData.hours_tuesday });
		if (storeData.hours_wednesday?.length > 0) openHoursArray.push({ day: 'wed', hours: storeData.hours_wednesday });
		if (storeData.hours_thursday?.length > 0) openHoursArray.push({ day: 'thu', hours: storeData.hours_thursday });
		if (storeData.hours_friday?.length > 0) openHoursArray.push({ day: 'fri', hours: storeData.hours_friday });
		if (storeData.hours_saturday?.length > 0) openHoursArray.push({ day: 'sat', hours: storeData.hours_saturday });
		if (storeData.hours_sunday?.length > 0) openHoursArray.push({ day: 'sun', hours: storeData.hours_sunday });

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
	}, [t, storeData.hours_monday, storeData.hours_tuesday, storeData.hours_wednesday, storeData.hours_thursday, storeData.hours_friday, storeData.hours_saturday, storeData.hours_sunday]);

	//
	// C. Render components

	return (
		<div className={`${styles.container} ${isSelected && styles.isSelected}`} id={storeData.id} onClick={() => onSelect(storeData.id)}>
			<div className={styles.header}>
				<h3 className={styles.storeBrand}>{storeData.brand_name}</h3>
				<h3 className={styles.storeName}>{storeData.short_name}</h3>
			</div>
			<StoresListGroupItemRealtime data={storeData} />
			<div className={styles.infoGroupWrapper}>
				<p className={styles.label}>{t('schedules.label')}</p>
				{parsedSchedules.map(item => (
					<p key={item.days} className={styles.value}>{item.days} {item.hours}</p>
				))}
			</div>
			<div className={styles.infoGroupWrapper}>
				<p className={styles.label}>{t('address')}</p>
				<p className={styles.value}>{storeData.address}</p>
				<p className={styles.value}>{storeData.postal_code} {storeData.locality}</p>
			</div>
			<div className={styles.actionsWrapper}>
				<Button href={googleMapsDirectionsUrl} icon={<IconMap size={18} />} label={t('get_directions')} target="_blank" />
				{/* <Button href={appleMapsDirectionsUrl} icon={<IconMap size={18} />} label={t('get_directions')} target="_blank" /> */}
			</div>
		</div>
	);

	//
}
