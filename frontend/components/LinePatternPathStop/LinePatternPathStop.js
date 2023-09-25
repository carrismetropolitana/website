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

export default function LinePatternPathStop({ index, stop_code }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathStop');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_code && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_code}`);
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
        <div className={styles.travelTime}></div>

        <LinePatternPathSpine style={index === 0 ? 'start' : 'regular'} color={patternData.color} text_color={patternData.text_color} isSelected={isThisStopSelected} />

        <div className={styles.info}>
          <div className={styles.header}>
            <div>{stopData.code}</div>
            <StopName code={stopData.code} name={stopData.name} short_name={stopData.short_name} tts_name={stopData.tts_name} locality={stopData.locality} municipality={stopData.municipality_name} selected={isThisStopSelected} />
            {!isThisStopSelected && <StopRealTime pattern_code={lineForm.values.pattern_code} stop_code={stopData.code} />}
          </div>

          {isThisStopSelected && (
            <div className={styles.body}>
              <Text type="mini-label">Próximas circulações</Text>
              <StopRealTime pattern_code={lineForm.values.pattern_code} stop_code={stopData.code} />
            </div>
          )}

          {isThisStopSelected && (
            <div className={styles.body}>
              <Text type="mini-label">Horários previstos nesta paragem</Text>
              <LinePatternPathTimetable index={index} stop_code={stop_code} />
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
