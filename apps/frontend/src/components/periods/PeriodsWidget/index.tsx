'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { PeriodsWidgetItem } from '@/components/periods/PeriodsWidgetItem';
import getOperationalDate from '@/utils/operation';
import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface PeriodsDataFormatted {
	id: string
	isActive: boolean
	name: string
	validPairs: {
		from: Date
		until: Date
	}[]
}

/* * */

export function PeriodsWidget() {
	//

	//
	// A. Setup variables

	const [periodsDataFormatted, setPeriodsDataFormatted] = useState<PeriodsDataFormatted[]>();

	//
	// B. Fetch data

	const { data: periodsData } = useSWR('https://api.carrismetropolitana.pt/v2/periods');

	//
	// C. Transform data

	useEffect(() => {
		const formatPeriodsData = () => {
			// Return early if no data is available
			if (!periodsData) return;
			// Setup the operational date time variable
			const operationalDate = getOperationalDate();
			// For each period, check if it contains the date for today
			const filteredPeriods = periodsData.map((period) => {
				// Filter valid pairs with 'until' dates before the current date
				const validPairsFiltered = period.valid.filter((validPair) => {
					return Number(validPair.until) >= Number(operationalDate);
				});
				// Format the valid pairs into the display format
				const validPairsFormatted = validPairsFiltered.map((validPair) => {
					const fromDateFormatted = DateTime.fromFormat(validPair.from, 'yyyyMMdd', { zone: 'Europe/Lisbon' }).set({ hour: 10 }).toJSDate();
					const untilDateFormatted = DateTime.fromFormat(validPair.until, 'yyyyMMdd', { zone: 'Europe/Lisbon' }).set({ hour: 10 }).toJSDate();
					return { from: fromDateFormatted, until: untilDateFormatted };
				});
				// Return the formatted period data
				return {
					id: period.id,
					isActive: period.dates.includes(operationalDate) ? true : false,
					name: period.name,
					validPairs: validPairsFormatted,
				};
			});
			// Sort the periods by the first valid pair's 'from' date
			const result = filteredPeriods.sort((a, b) => {
				if (a.validPairs.length === 0 || b.validPairs.length === 0) return 0;
				return a.validPairs[0].from.getTime() - b.validPairs[0].from.getTime();
			});
			// Set the formatted data
			setPeriodsDataFormatted(result);
			//
		};
		//
		formatPeriodsData();
		const interval = setInterval(() => formatPeriodsData(), 300000 /* 5 minutes */);
		return () => clearInterval(interval);
		//
	}, [periodsData]);

	//
	// D. Render components

	if (!periodsDataFormatted || periodsDataFormatted.length === 0) {
		return null;
	}

	return (
		<Surface variant="persistent">
			<div className={styles.container}>
				{periodsDataFormatted.map((item, index) => (
					<Fragment key={item.id}>
						{index > 0 && <div className={styles.divider} />}
						<PeriodsWidgetItem periodData={item} />
					</Fragment>
				))}
			</div>
		</Surface>
	);

	//
}
