import useSWR from 'swr';
import { useState, useEffect } from 'react';
import styles from './StopTimetable.module.css';
import LineDisplay from '../LineDisplay/LineDisplay';
import Loader from '../Loader/Loader';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Select } from '@mantine/core';

export default function StopTimetable({ stopCode }) {
  //

  //
  // A. Setup variables

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTrip, setSelectedTrip] = useState();

  const [timetableLoading, setTimetableLoading] = useState(true);
  const [timetableData, setTimetableData] = useState([]);

  //
  // B. Fetch data

  const { data: stopData, error: stopError, isLoading: stopLoading } = useSWR(stopCode && `https://api.carrismetropolitana.pt/stops/${stopCode}`);

  //
  // D. Handle actions

  //
  // D. Handle actions

  useEffect(() => {
    (async function fetchData() {
      // Return empty if routesData is not finished loading
      if (!stopData || !stopData.patterns.length) return;
      //
      setTimetableLoading(true);
      // Set today
      const selectedDateString = dayjs(selectedDate).format('YYYYMMDD');
      // Initiate a temporary variable to hold values processed timetable
      let timetableDataTemp = [];

      //   TEST LOAD
      //   for (const routeCode of stopData.routes) {
      //     const routeRequest = await fetch(`https://schedules.carrismetropolitana.pt/api/routes/route_id/${routeCode}`);
      //     const routeData = await routeRequest.json();
      //     console.log(routeData);
      //   }

      // Iterate on each route, direction and trip to filter out the arrival_time
      // on the given stop and build the timetable object.
      for (const patternCode of stopData.patterns) {
        //
        const patternRequest = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternCode}`);
        const patternData = await patternRequest.json();
        //
        for (const trip of patternData.trips) {
          // Only get timetables for trips happening on the selected date
          if (trip.dates.includes(selectedDateString)) {
            // Get the schedule on the stop_sequence matching the given stop_id
            const schedule = trip.schedule.find((s, index) => {
              // console.log(stopCode);
              const isSelectedStop = s.stop_code === stopCode;
              const isLastStop = index === trip.schedule.length - 1;
              return isSelectedStop && !isLastStop;
            });

            // If schedule is defined, then build the timetable entry object
            if (schedule) {
              // Parse trip to timetable format
              timetableDataTemp.push({
                code: trip.code,
                line_code: patternData.line_code,
                color: patternData.color,
                text_color: patternData.text_color,
                short_name: patternData.short_name,
                headsign: patternData.headsign,
                arrival_time: schedule.arrival_time.substring(0, 5),
                arrival_time_operation: schedule.arrival_time_operation,
                localities: patternData.localities,
              });
            }
          }
        }
      }
      // Sort the array by arrival_time, ascending
      timetableDataTemp.sort((a, b) => {
        // Convert the time strings to Date objects for comparison
        const dateA = a.arrival_time_operation.split(':').join('');
        const dateB = b.arrival_time_operation.split(':').join('');
        // Compare the dates and return the result
        return dateA - dateB;
      });
      // Return the temporary variable to save in Memo
      setTimetableData(timetableDataTemp);
      setTimetableLoading(false);
      //
    })();
  }, [selectedDate, stopCode, stopData]);

  //
  // D. Handle actions

  return (
    <>
      {stopLoading ||
        (timetableLoading && (
          <div className={styles.container}>
            <Loader visible />
          </div>
        ))}
      {stopData && !timetableLoading && timetableData.length > 0 && (
        <div className={styles.container}>
          <div>Filtrar por headsign, locality e escolher data</div>
          <Select label='municipio' data={[]} />
          <Select label='locality' data={[]} />
          <DatePickerInput dropdownType='modal' icon={<IconCalendar size={18} />} valueFormat='DD MMMM YYYY' label='Date input' placeholder='Date input' value={selectedDate} onChange={setSelectedDate} />
          <div className={styles.tableHeader}>
            <div className={`${styles.tableHeaderColumn} ${styles.headerLine}`}>Linha e Destino</div>
            <div className={styles.tableHeaderColumn}>Previsão</div>
          </div>
          <div className={styles.tableBody}>
            {timetableData.map((trip, index) => (
              <div
                key={index}
                className={`${styles.tableBodyRow} ${selectedTrip === trip.code ? styles.selectedTrip : ''}`}
                onClick={() => {
                  if (selectedTrip === trip.code) setSelectedTrip();
                  else setSelectedTrip(trip.code);
                }}
              >
                <div className={styles.tableBodyRowWrapper}>
                  <div className={styles.tableBodyColumn}>
                    <LineDisplay short_name={trip.short_name} long_name={trip.headsign} color={trip.color} text_color={trip.text_color} />
                  </div>
                  <div className={`${styles.tableBodyColumn} ${styles.bodyArrivalTime}`}>{trip.arrival_time}</div>
                </div>
                <div className={styles.tripAdditionalInfo}>
                  <div className={styles.localitiesPerLine}>
                    <p>Passa por</p>
                    <div className={styles.localities}>
                      {trip.localities.length > 0 &&
                        trip.localities.map((locality, index) => (
                          <div key={index}>
                            {index > 0 && '•'}
                            <p style={{ color: 'var(--gray7)' }}>{locality}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
