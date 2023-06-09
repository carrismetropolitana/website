import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import styles from './StopTimetable.module.css';
import LineDisplay from '../LineDisplay/LineDisplay';
import Loader from '../Loader/Loader';

export default function StopTimetable({ stopId, selectedDate }) {
  //

  //
  // A. Setup variables

  const [routesData, setRoutesData] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState();

  //
  // B. Fetch data

  const { data: stopData, error: stopError, isLoading: stopLoading } = useSWR(stopId && `https://schedules.carrismetropolitana.pt/api/stops/${stopId}`);

  //
  // D. Handle actions

  useEffect(() => {
    (async function fetchData() {
      // Skip if no data
      if (!stopData) return [];
      // Setup a variable to hold all the routes at this stop
      let routesDataTemp = [];
      // Iterate on each route at this stop
      for (const route of stopData.routes) {
        try {
          const response = await fetch(`https://schedules.carrismetropolitana.pt/api/routes/route_id/${route.route_id}`);
          const data = await response.json();
          routesDataTemp.push(data);
        } catch (error) {
          console.log(error);
        }
      }
      // Set state with the fetched data
      setRoutesData(routesDataTemp);
      //
    })();
  }, [stopData]);

  const timetableData = useMemo(() => {
    // Return empty if routesData is not finished loading
    if (!routesData && !routesData.length) return [];
    // Initiate a temporary variable to hold values processed timetable
    let timetableDataTemp = [];
    // Iterate on each route, direction and trip to filter out the arrival_time
    // on the given stop and build the timetable object.
    for (const route of routesData) {
      for (const direction of route.directions) {
        for (const trip of direction.trips) {
          // Only get timetables for trips happening on the selected date
          if (trip.dates.includes(selectedDate)) {
            // Get the schedule on the stop_sequence matching the given stop_id
            const schedule = trip.schedule.find((s, index) => {
              const isSelectedStop = s.stop_id === stopId;
              const isLastStop = index === trip.schedule.length - 1;
              return isSelectedStop && !isLastStop;
            });
            // If schedule is defined, then build the timetable entry object
            if (schedule) {
              timetableDataTemp.push({
                trip_id: trip.trip_id,
                route_id: route.route_id,
                route_color: route.route_color,
                route_text_color: route.route_text_color,
                route_short_name: route.route_short_name,
                headsign: direction.headsign,
                arrival_time: schedule.arrival_time.substring(0, 5),
              });
            }
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
  }, [routesData, selectedDate, stopId]);

  //
  // D. Handle actions

  return (
    <div className={styles.container}>
      <div>Filtrar por headsign, locality e escolher data</div>
      <div className={styles.tableHeader}>
        <div className={`${styles.tableHeaderColumn} ${styles.headerLine}`}>Linha e Destino</div>
        <div className={styles.tableHeaderColumn}>Previsão</div>
      </div>
      <div className={styles.tableBody}>
        {timetableData &&
          timetableData.map((trip, index) => (
            <div
              key={index}
              className={`${styles.tableBodyRow} ${selectedTrip === trip.trip_id ? styles.selectedTrip : ''}`}
              onClick={() => {
                console.log(selectedTrip === trip.trip_id);

                setSelectedTrip(trip.trip_id);
              }}
            >
              <div className={styles.tableBodyRowWrapper}>
                <div className={styles.tableBodyColumn}>
                  <LineDisplay short_name={trip.route_short_name} long_name={trip.headsign} color={trip.route_color} text_color={trip.route_text_color} />
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
  );
}
