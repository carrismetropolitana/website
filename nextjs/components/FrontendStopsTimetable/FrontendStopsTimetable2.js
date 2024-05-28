'use client';

import { Divider } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import StopTimetableRow from '../FrontendStopsTimetableRow/FrontendStopsTimetableRow'
import LineDisplay from '../LineDisplay/LineDisplay'
import Loader from '../Loader/Loader'
import NoDataLabel from '../NoDataLabel/NoDataLabel'
import styles from './FrontendStopsTimetable.module.css'

export default function StopTimetable({ onSelectTrip, selectedStopCode, selectedTripCode }) {
  //

  //
  // A. Setup variables

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [timetableLoading, setTimetableLoading] = useState(true);
  const [timetableData, setTimetableData] = useState([]);

  //
  // B. Fetch data

  const { data: allLinesData, error: allLinesError, isLoading: allLinesLoading } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { data: stopData, error: stopError, isLoading: stopLoading } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}`);
  const { data: stopRealtimeData, error: stopRealtimeError, isLoading: stopRealtimeLoading } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}/realtime`);

  //
  // D. Handle actions

  useEffect(() => {
    (async function fetchData() {
      //

      // 1.
      // Return if stopRealtimeData is not yet valid
      if (!stopRealtimeData) return;

      // 2.
      // If stopRealtimeLoading is empty, stop loading and return
      if (!stopRealtimeData.length) {
        setTimetableLoading(false);
        return;
      }

      // 3.
      // Setup temporary variables
      let timetableDataTemp = [];

      // 4.
      // Check if the selected date is today
      const isSelectedDateToday = true;

      // 5.
      // Show realtime for this stop if date is today
      if (isSelectedDateToday) {
        timetableDataTemp = stopRealtimeData.map((realtimeEntry) => {
          //
          const lineInfo = allLinesData.find(line => line.code === realtimeEntry.line_code);

          let tripStatus = 'scheduled';
          let displayTime = '';

          if (realtimeEntry.observed_arrival) {
            // If the bus has already passed by this stop
            displayTime = realtimeEntry.observed_arrival.substring(0, 5);
            tripStatus = 'passed';
            //
          }
 else if (realtimeEntry.estimated_arrival) {
            displayTime = realtimeEntry.estimated_arrival.substring(0, 5);
            tripStatus = 'realtime';
          }
 else {
            displayTime = realtimeEntry.scheduled_arrival.substring(0, 5);
            tripStatus = 'scheduled';
          }

          return {
            ...realtimeEntry,
            color: lineInfo.color || '#000000',
            display_time: displayTime,
            is_real_time: false,
            localities: [],
            text_color: lineInfo.text_color || '#ffffff',
            trip_status: tripStatus,
          }
        });
      }

      // 6.
      // Show scheduled data for any other date
      if (!isSelectedDateToday) {
        //
      }

      // 7.
      // Sort the array by arrival_time, ascending
      timetableDataTemp.sort((a, b) => {
        // Convert the time strings to Date objects for comparison
        const dateA = a.scheduled_arrival.split(':').join('');
        const dateB = b.scheduled_arrival.split(':').join('');
        // Compare the dates and return the result
        return dateA - dateB;
      })
      // Return the temporary variable to save in Memo
      setTimetableData(timetableDataTemp);
      setTimetableLoading(false);
      //
    })();
  }, [allLinesData, selectedDate, selectedStopCode, stopData, stopRealtimeData, timetableLoading]);

  //   useEffect(() => {
  //     (async function fetchData() {
  //       // Return empty if routesData is not finished loading
  //       if (!stopData || !stopData?.patterns?.length) {
  //         setTimetableData([]);
  //         setTimetableLoading(false);
  //         return;
  //       }

  //       //
  //       setTimetableLoading(true);

  //       // Set today
  //       const selectedDateString = dayjs(selectedDate).format('YYYYMMDD');
  //       // Initiate a temporary variable to hold values processed timetable
  //       let timetableDataTemp = [];

  //       // Iterate on each route, direction and trip to filter out the arrival_time
  //       // on the given stop and build the timetable object.
  //       for (const patternCode of stopData.patterns) {
  //         //
  //         const patternRequest = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternCode}`);
  //         const patternData = await patternRequest.json();
  //         //
  //         for (const trip of patternData.trips) {
  //           // Only get timetables for trips happening on the selected date
  //           if (trip.dates.includes(selectedDateString)) {
  //             // Get the schedule on the stop_sequence matching the given stop_id
  //             const schedule = trip.schedule.find((s, index) => {
  //               // console.log(selectedStopCode);
  //               const isSelectedStop = s.stop_code === selectedStopCode;
  //               const isLastStop = index === trip.schedule.length - 1;
  //               return isSelectedStop && !isLastStop;
  //             });

  //             // If schedule is defined, then build the timetable entry object
  //             if (schedule) {
  //               // Find realtime estimate for this trip
  //               const rtestimate = stopRealtimeData?.find((realtime) => {
  //                 console.log('realtime.trip_code', realtime.trip_code);
  //                 console.log('trip.code', trip.code.slice(3));
  //                 realtime.trip_code === trip.code.slice(3);
  //               });
  //               //   console.log(rtestimate?.estimated_arrival);
  //               // Parse trip to timetable format
  //               timetableDataTemp.push({
  //                 code: trip.code,
  //                 line_code: patternData.line_code,
  //                 color: patternData.color,
  //                 text_color: patternData.text_color,
  //                 short_name: patternData.short_name,
  //                 headsign: patternData.headsign,
  //                 arrival_time: schedule.arrival_time.substring(0, 5),
  //                 arrival_time_operation: schedule.arrival_time_operation,
  //                 localities: patternData.localities,
  //               });
  //             }
  //           }
  //         }
  //       }
  //       // Sort the array by arrival_time, ascending
  //       timetableDataTemp.sort((a, b) => {
  //         // Convert the time strings to Date objects for comparison
  //         const dateA = a.arrival_time_operation.split(':').join('');
  //         const dateB = b.arrival_time_operation.split(':').join('');
  //         // Compare the dates and return the result
  //         return dateA - dateB;
  //       });
  //       // Return the temporary variable to save in Memo
  //       setTimetableData(timetableDataTemp);
  //       setTimetableLoading(false);
  //       //
  //     })();
  //   }, [selectedDate, selectedStopCode, stopData, stopRealtimeData]);

  //
  // D. Handle actions

  return (
    <>
      {stopLoading || timetableLoading ?
				<div className={styles.container}>
  <Loader visible />
      </div> :
				stopData && !timetableLoading && timetableData.length > 0 ?
					<div className={styles.container}>
  <DatePickerInput dropdownType="modal" icon={<IconCalendar size={18} />} label="Date input" onChange={setSelectedDate} placeholder="Date input" value={selectedDate} valueFormat="DD MMMM YYYY" />
  <Divider />
  <div className={styles.tableHeader}>
    <div className={`${styles.tableHeaderColumn} ${styles.headerLine}`}>Linha e Destino</div>
    <div className={styles.tableHeaderColumn}>Previsão</div>
  </div>
  <div className={styles.tableBody}>
    {timetableData.map(trip => <StopTimetableRow key={trip.trip_code} onSelectTrip={onSelectTrip} selectedTripCode={selectedTripCode} trip={trip} />)}
  </div>
       </div> :
					<NoDataLabel fill text="no service" />}
    </>
  )
}
