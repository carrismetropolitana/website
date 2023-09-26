import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathStop.module.css';
import CopyBadge from '../CopyBadge/CopyBadge';
import LinePatternPathSpine from '../LinePatternPathSpine/LinePatternPathSpine';
import LinePatternPathTimetable from '../LinePatternPathTimetable/LinePatternPathTimetable';
import { useMemo } from 'react';
import StopName from '../StopName/StopName';
import { Space } from '@mantine/core';
import StopPDF from '../StopPDF/StopPDF';
import StopRealTime from '../StopRealTime/StopRealTime';
import LiveIcon from '../LiveIcon/LiveIcon';
import Text from '../Text/Text';

//
//
//
//

export default function LinePatternPathStop({ index, stopId }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathStop');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_id && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_id}`);
  const { data: stopData } = useSWR(stopId && `https://api.carrismetropolitana.pt/stops/${stopId}`);

  //
  // C. Handle actions

  const isThisStopSelected = useMemo(() => {
    return lineForm.values.stop_id === stopId;
  }, [lineForm.values.stop_id, stopId]);

  //
  // C. Handle actions

  const handleStopClick = () => {
    lineForm.setFieldValue('stop_code', stopId);
  };

  //
  // D. Render components

  return (
    stopData && (
      <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
        <div className={styles.travelTime}></div>

        <LinePatternPathSpine style={index === 0 ? 'start' : 'regular'} color={patternData.color} text_color={patternData.text_color} isSelected={isThisStopSelected} />

        <div className={styles.info}>
          <div className={styles.header}>
            <div>{stopData.id}</div>
            <StopName name={stopData.name} tts_name={stopData.tts_name} locality={stopData.locality} municipality={stopData.municipality_name} selected={isThisStopSelected} />
            {!isThisStopSelected && <StopRealTime pattern_code={lineForm.values.pattern_id} stop_code={stopData.id} />}
          </div>

          {isThisStopSelected && (
            <div className={styles.body}>
              <Text type="mini-label">Próximas circulações</Text>
              <StopRealTime pattern_id={lineForm.values.pattern_code} stop_id={stopData.code} />
            </div>
          )}

          {isThisStopSelected && (
            <div className={styles.body}>
              <Text type="mini-label">Horários previstos nesta paragem</Text>
              <LinePatternPathTimetable index={index} stopId={stopId} />
            </div>
          )}

          {/* {isThisStopSelected && <StopPDF line_code={lineForm.values.line_code} stop_code={stop_code} direction={patternData.direction} />} */}
          {/* {isThisStopSelected && (
            <div className={styles.body}>
              <div className={styles.ids}>
                <CopyBadge label={`#${stopData.code}`} value={stopData.code} />
                <CopyBadge label={`${stopData.latitude}, ${stopData.longitude}`} value={`${stopData.latitude}	${stopData.longitude}`} />
              </div>
              <LinePatternPathTimetable index={index} stop_code={stop_code} />
            </div>
          )} */}
        </div>
      </div>
    )
  );

  //
}
