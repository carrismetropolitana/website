'use client';

/* * */

import FrontendLinesToolbarPeriodsPeriod from '@/components/FrontendLinesToolbarPeriodsPeriod/FrontendLinesToolbarPeriodsPeriod';
import { Carousel } from '@mantine/carousel';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import styles from './FrontendLinesToolbarPeriods.module.css';

/* * */

export default function FrontendLinesToolbarPeriods() {
	//

	//
	// A. Setup variables

	const [currentDateTime, setCurrentDateTime] = useState(DateTime.now());

	//
	// B. Fetch data

	const { data: periodsData } = useSWR('https://api.carrismetropolitana.pt/periods');

	//
	// C. Transform data

	useEffect(() => {
		const interval = setInterval(() => setCurrentDateTime(DateTime.now()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const periodsDataFormatted = useMemo(() => {
		// Return early if no data is available
		if (!periodsData) return;
		// Setup the operational date time variable
		let operationDateTime = currentDateTime;
		// Get the current hour
		const currentHourString = operationDateTime.toFormat('H');
		// If the current hour is between 00:00 and 03:59 then set the current date to yesterday
		if (currentHourString >= 0 && currentHourString < 4) operationDateTime = currentDateTime.minus({ days: 1 });
		// Setup variable for the current date date in YYYYMMDD format using luxon
		const currentDayString = operationDateTime.toFormat('yyyyMMdd');
		// For each period, check if it contains the date for today
		return periodsData.map((period) => {
			// Filter valid pairs with 'until' dates before the current date
			const validPairsFiltered = period.valid.filter((validPair) => {
				return Number(validPair.until) >= Number(currentDayString);
			});
			// Format the valid pairs into the display format
			const validPairsFormatted = validPairsFiltered.map((validPair) => {
				const fromDateFormatted = DateTime.fromFormat(validPair.from, 'yyyyMMdd', { locale: 'pt' }).toFormat('dd MMM yyyy');
				const untilDateFormatted = DateTime.fromFormat(validPair.until, 'yyyyMMdd', { locale: 'pt' }).toFormat('dd MMM yyyy');
				return { from: fromDateFormatted, until: untilDateFormatted };
			});
			// Slice the valid pairs so that only the next two are shown
			const validPairsSliced = validPairsFormatted.slice(0, 2);
			// Return the period object with the formatted valid pairs
			return {
				id: period.id,
				isActive: period.dates.includes(currentDayString) ? true : false,
				name: period.name,
				validPairs: validPairsSliced,
			};
		});
	}, [currentDateTime, periodsData]);

	//
	// D. Render components

	return (
		<>
			<div className={styles.onlyOnDesktop}>{periodsDataFormatted && periodsDataFormatted.map(item => <FrontendLinesToolbarPeriodsPeriod key={item.id} periodData={item} />)}</div>
			<div className={styles.onlyOnMobile}>
				<Carousel align="center" classNames={{ indicator: styles.indicator, indicators: styles.indicators }} initialSlide={periodsDataFormatted?.findIndex(item => item.isActive)} slideSize={300} withControls={false} withIndicators>
					{periodsDataFormatted
					&& periodsDataFormatted.map(item => (
						<Carousel.Slide key={item.id}>
							<FrontendLinesToolbarPeriodsPeriod periodData={item} />
						</Carousel.Slide>
					),

					)}
				</Carousel>
			</div>
		</>
	);

	//
}
