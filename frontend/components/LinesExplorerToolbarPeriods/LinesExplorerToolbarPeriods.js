'use client';

/* * */

import useSWR from 'swr';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import styles from './LinesExplorerToolbarPeriods.module.css';
import { Carousel } from '@mantine/carousel';
import LinesExplorerToolbarPeriodsPeriod from '@/components/LinesExplorerToolbarPeriodsPeriod/LinesExplorerToolbarPeriodsPeriod';

/* * */

export default function LinesExplorerToolbarPeriods() {
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
        const fromDateFormatted = DateTime.fromFormat(validPair.from, 'yyyyMMdd').toFormat('dd MMM yyyy');
        const untilDateFormatted = DateTime.fromFormat(validPair.until, 'yyyyMMdd').toFormat('dd MMM yyyy');
        return { from: fromDateFormatted, until: untilDateFormatted };
      });
      // Slice the valid pairs so that only the next is shown
      const validPairsSliced = validPairsFormatted.slice(0, 1);
      // Return the period object with the formatted valid pairs
      return {
        id: period.id,
        name: period.name,
        isActive: period.dates.includes(currentDayString) ? true : false,
        validPairs: validPairsSliced,
      };
    });
  }, [currentDateTime, periodsData]);

  //
  // D. Render components

  return (
    <>
      <div className={styles.onlyOnDesktop}>{periodsDataFormatted && periodsDataFormatted.map((item) => <LinesExplorerToolbarPeriodsPeriod key={item.id} periodData={item} />)}</div>
      <div className={styles.onlyOnMobile}>
        <Carousel slideSize={300} align={'center'} withControls={false} withIndicators classNames={{ indicators: styles.indicators, indicator: styles.indicator }} initialSlide={periodsDataFormatted?.findIndex((item) => item.isActive)}>
          {periodsDataFormatted &&
            periodsDataFormatted.map((item) => (
              <Carousel.Slide key={item.id}>
                <LinesExplorerToolbarPeriodsPeriod periodData={item} />
              </Carousel.Slide>
            ))}
        </Carousel>
      </div>
    </>
  );

  //   return (
  //     <div className={styles.container}>
  //       {periodsDataFormatted &&
  //         periodsDataFormatted.map((item) => (
  //           <div key={item.id} className={`${styles.period} ${item.isActive && styles.isActive}`}>
  //             <h5 className={styles.periodName}>
  //               {item.name}
  //               {item.isActive && <LiveIcon color="#ffffff" />}
  //             </h5>
  //             {item.validPairs.map((validPair, index) => (
  //               <p key={index} className={styles.validPair}>
  //                 <span className={styles.validPairDate}>{validPair.from}</span> <IconArrowNarrowRight size={15} /> <span className={styles.validPairDate}>{validPair.until}</span>
  //               </p>
  //             ))}
  //           </div>
  //         ))}
  //     </div>
  //   );

  //
}
