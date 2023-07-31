import styles from './MapAndTimetableWrapper.module.css';

export default function MapAndTimetableWrapper({ map, timetable }) {
  return (
    <div className={styles.container}>
      {map && <div className={styles.map}>{map}</div>}
      <div className={styles.timetable}>{timetable}</div>
    </div>
  );
}
