'use client';

import styles from './StopsExplorerTimetable.module.css';
import { Divider } from '@mantine/core';
import StopTimetable from '@/components/StopTimetable/StopTimetable';
import StopInfo from '@/components/StopInfo/StopInfo';
import NoDataLabel from '../NoDataLabel/NoDataLabel';

export default function StopsExplorerTimetable({ selectedStopCode }) {
  //

  //
  // A. Setup variables

  //
  // G. Render components

  return (
    <div className={styles.container}>
      {selectedStopCode ? (
        <div>
          <StopInfo stopCode={selectedStopCode} />
          <Divider />
          <StopTimetable stopCode={selectedStopCode} selectedDate={'20230607'} />
        </div>
      ) : (
        <NoDataLabel />
      )}
    </div>
  );
}
