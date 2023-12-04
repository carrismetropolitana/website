'use client';

/* * */

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinesExplorerContentPatternPathStop.module.css';
import CopyBadge from '../CopyBadge/CopyBadge';
import LinePatternPathSpine from '../LinePatternPathSpine/LinePatternPathSpine';
import LinePatternPathTimetable from '../LinePatternPathTimetable/LinePatternPathTimetable';
import { useMemo, useState } from 'react';
import StopName from '../StopName/StopName';
import { Space } from '@mantine/core';
import StopPDF from '../StopPDF/StopPDF';
import StopRealTime from '../StopRealTime/StopRealTime';
import LiveIcon from '../LiveIcon/LiveIcon';
import Text from '../Text/Text';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerContentPatternPathStop({ pathStopData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStop');
  const linesExplorerContext = useLinesExplorerContext();
  const [isThisStopSelected, setIsThisStopSelected] = useState(false);

  //
  // B. Handle actions

  const handleStopClick = () => {
    setIsThisStopSelected((prev) => !prev);
  };

  //
  // C. Render components

  return (
    <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
      <div className={styles.travelTime}></div>

      {/* <LinePatternPathSpine style={pathStopData.stop_sequence === 0 ? 'start' : 'regular'} color={linesExplorerContext.entities.pattern.color} text_color={linesExplorerContext.entities.pattern.text_color} isSelected={isThisStopSelected} /> */}

      <div className={styles.info}>
        <div className={styles.header}>
          <div>{pathStopData.stop.id}</div>
          <StopName id={pathStopData.stop.id} name={pathStopData.stop.name} tts_name={pathStopData.stop.tts_name} locality={pathStopData.stop.localiy} municipality={pathStopData.stop.municipality} />
          {!isThisStopSelected && <StopRealTime pattern_code={linesExplorerContext.entities.pattern.id} stop_code={pathStopData.stop.id} />}
        </div>

        {isThisStopSelected && (
          <div className={styles.body}>
            <Text type="mini-label">Próximas circulações</Text>
            <StopRealTime pattern_id={linesExplorerContext.entities.pattern.id} stop_id={pathStopData.stop.id} />
          </div>
        )}

        {isThisStopSelected && (
          <div className={styles.body}>
            <Text type="mini-label">Horários previstos nesta paragem</Text>
            <LinePatternPathTimetable index={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
          </div>
        )}

        {/* {isThisStopSelected && <StopPDF line_code={lineForm.values.line_code} stop_code={stop_code} direction={linesExplorerContext.entities.pattern.direction} />} */}
        {/* {isThisStopSelected && (
            <div className={styles.body}>
              <div className={styles.ids}>
                <CopyBadge label={`#${pathStopData.stop.id}`} value={pathStopData.stop.id} />
                <CopyBadge label={`${pathStopData.stop.latitude}, ${pathStopData.stop.longitude}`} value={`${pathStopData.stop.latitude}	${pathStopData.stop.longitude}`} />
              </div>
              <LinePatternPathTimetable index={index} stop_code={stop_code} />
            </div>
          )} */}
      </div>
    </div>
  );

  //
}
