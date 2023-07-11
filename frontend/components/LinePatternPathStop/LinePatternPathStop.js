import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathStop.module.css';
import StopLocationInfo from '@/components/StopLocationInfo/StopLocationInfo';
import CopyBadge from '../CopyBadge/CopyBadge';
import LinePatternPathSpine from '../LinePatternPathSpine/LinePatternPathSpine';
import LinePatternPathTimetable from '../LinePatternPathTimetable/LinePatternPathTimetable';
import { useMemo } from 'react';

//
//
//
//

export default function LinePatternPathStop({ index, stop_code }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathStop');

  //
  // B. Fetch data

  const { data: stopData } = useSWR(stop_code && `https://api.carrismetropolitana.pt/stops/${stop_code}`);

  //
  // C. Handle actions

  const isThisStopSelected = useMemo(() => {
    return lineForm.values.stop_code === stop_code;
  }, [lineForm.values.stop_code, stop_code]);

  //
  // C. Handle actions

  const handleStopClick = () => {
    lineForm.setFieldValue('stop_code', stop_code);
  };

  //
  // D. Render components

  return (
    stopData && (
      <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
        <div className={styles.travelTime}>tt</div>
        <LinePatternPathSpine style={index === 0 ? 'start' : 'regular'} isSelected={isThisStopSelected} />
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.stopName}>{stopData.name}</h2>
            <StopLocationInfo locality={stopData.locality} municipality={stopData.municipality_name} />
            <div className={styles.facilities}></div>
          </div>
          {isThisStopSelected && (
            <div className={styles.body}>
              <div className={styles.ids}>
                <CopyBadge label={`#${stopData.code}`} value={stopData.code} />
                <CopyBadge label={`${stopData.latitude}, ${stopData.longitude}`} value={`${stopData.latitude}	${stopData.longitude}`} />
              </div>
              <LinePatternPathTimetable index={index} stop_code={stop_code} />
            </div>
          )}
        </div>
      </div>
    )
  );

  //
}
