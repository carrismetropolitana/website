import useSWR from 'swr';
import { useState, useMemo } from 'react';
import styles from './StopTimetable.module.css';
import LineDisplay from '../LineDisplay/LineDisplay';
import Loader from '../Loader/Loader';
import { IconCalendar } from '@tabler/icons-react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Select } from '@mantine/core';

export default function StopTimetable({ stopCode }) {
  //

  //
  // A. Setup variables

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTrip, setSelectedTrip] = useState();

  //
  // B. Fetch data

  const { data: stopPatternsData, error: stopPatternsError, isLoading: stopPatternsLoading } = useSWR(stopCode && `https://api.carrismetropolitana.pt/stops/${stopCode}/patterns`);

  //
  // D. Handle actions

  //
  // D. Handle actions

  const timetableData = useMemo(() => {
    // Return empty if routesData is not finished loading
    if (!stopPatternsData || !stopPatternsData.patterns.length) return [];
    // Initiate a temporary variable to hold values processed timetable
    const selectedDateString = dayjs(selectedDate).format('YYYYMMDD');
    // Initiate a temporary variable to hold values processed timetable
    let timetableDataTemp = [];
    // Iterate on each route, direction and trip to filter out the arrival_time
    // on the given stop and build the timetable object.
    for (const pattern of stopPatternsData.patterns) {
      for (const trip of pattern.trips) {
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
            // Find out which localities pass by this trip
            const tripLocalities = [];
            // Parse trip to timetable format
            timetableDataTemp.push({
              trip_code: trip.trip_code,
              line_code: pattern.line_code,
              color: pattern.color,
              text_color: pattern.text_color,
              short_name: pattern.short_name,
              headsign: pattern.headsign,
              arrival_time: schedule.arrival_time.substring(0, 5),
            });
          }
        }
      }
    }
    // Sort the array by arrival_time, ascending
    timetableDataTemp.sort((a, b) => {
      // Convert the time strings to Date objects for comparison
      const dateA = new Date(`1970-01-01T${a.arrival_time}`);
      const dateB = new Date(`1970-01-01T${b.arrival_time}`);
      // Compare the dates and return the result
      return dateA - dateB;
    });
    // Return the temporary variable to save in Memo
    return timetableDataTemp;
    //
  }, [selectedDate, stopCode, stopPatternsData]);

  //
  // D. Handle actions

  return (
    <>
      {stopPatternsLoading && <Loader visible />}
      {stopPatternsData && (
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
            {timetableData &&
              timetableData.map((trip, index) => (
                <div
                  key={index}
                  className={`${styles.tableBodyRow} ${selectedTrip === trip.trip_code ? styles.selectedTrip : ''}`}
                  onClick={() => {
                    if (selectedTrip === trip.trip_code) setSelectedTrip();
                    else setSelectedTrip(trip.trip_code);
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
                      <p style={{ color: 'var(--gray7)' }}>Mouraria › Cais do Sodré › Montijo › Oeiras</p>
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
