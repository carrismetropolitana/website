'use client';

/* * */

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './LinesExplorerContentPatternPathStop.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerSelectDate from '@/components/LinesExplorerSelectDate/LinesExplorerSelectDate';
import LinesExplorerContentPatternPathStopPdf from '@/components/LinesExplorerContentPatternPathStopPdf/LinesExplorerContentPatternPathStopPdf';
import LinesExplorerContentPatternPathStopTimetable from '@/components/LinesExplorerContentPatternPathStopTimetable/LinesExplorerContentPatternPathStopTimetable';
import LinesExplorerContentPatternPathStopRealtime from '@/components/LinesExplorerContentPatternPathStopRealtime/LinesExplorerContentPatternPathStopRealtime';
import LinesExplorerContentPatternPathStopSpine from '@/components/LinesExplorerContentPatternPathStopSpine/LinesExplorerContentPatternPathStopSpine';
import LinesExplorerContentPatternPathStopName from '@/components/LinesExplorerContentPatternPathStopName/LinesExplorerContentPatternPathStopName';

/* * */

export default function LinesExplorerContentPatternPathStop({ pathStopData, pathIndex, pathIndexMax }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStop');
  const linesExplorerContext = useLinesExplorerContext();
  const [opened, { open, close }] = useDisclosure(false);

  //
  // B. Transform data

  const isThisStopSelected = useMemo(() => {
    const isSameStopId = linesExplorerContext.entities.stop?.id === pathStopData.stop.id;
    const isSameStopSequence = linesExplorerContext.entities.stop_sequence === pathStopData.stop_sequence;
    return isSameStopId && isSameStopSequence;
  }, [linesExplorerContext.entities.stop, linesExplorerContext.entities.stop_sequence, pathStopData]);

  //
  // C. Handle actions

  const handleStopClick = () => {
    linesExplorerContext.selectStop(pathStopData.stop, pathStopData.stop_sequence);
  };

  //
  // D. Render components

  return (
    <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
      <div className={styles.travelTime} />

      <LinesExplorerContentPatternPathStopSpine style={pathIndex === 0 ? 'start' : pathIndex === pathIndexMax ? 'end' : 'regular'} color={linesExplorerContext.entities.pattern.color} textColor={linesExplorerContext.entities.pattern.text_color} isSelected={isThisStopSelected} />

      <div className={styles.innerWrapper}>
        <div className={styles.stopInfo}>
          <LinesExplorerContentPatternPathStopName stopData={pathStopData.stop} isSelected={isThisStopSelected} />
          {!isThisStopSelected && <LinesExplorerContentPatternPathStopRealtime patternId={linesExplorerContext.entities.pattern.id} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} showScheduledArrivals={false} showLabel={false} />}
        </div>

        {isThisStopSelected && <LinesExplorerContentPatternPathStopRealtime patternId={linesExplorerContext.entities.pattern.id} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />}

        {isThisStopSelected && (
          <div className={`${styles.content} ${styles.onlyDesktop}`}>
            <p className={styles.label}>Horários previstos nesta paragem:</p>
            <LinesExplorerSelectDate />
            <LinesExplorerContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
            {/* <LinesExplorerContentPatternPathStopPdf lineId={linesExplorerContext.entities.line.id} stopId={pathStopData.stop.id} direction={linesExplorerContext.entities.pattern.direction} /> */}
          </div>
        )}

        <Drawer radius="md" opened={opened} onClose={close} title="Horários previstos nesta paragem" position="bottom">
          <div className={styles.content}>
            <p className={styles.label}>Horários previstos de passagem na paragem {pathStopData.stop.name}:</p>
            <LinesExplorerSelectDate />
            <LinesExplorerContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
            {/* <LinesExplorerContentPatternPathStopPdf lineId={linesExplorerContext.entities.line.id} stopId={pathStopData.stop.id} direction={linesExplorerContext.entities.pattern.direction} /> */}
          </div>
        </Drawer>

        {isThisStopSelected && (
          <div className={`${styles.openTimetable} ${styles.onlyMobile}`} onClick={open}>
            Abrir Horários
          </div>
        )}

        {isThisStopSelected && (
          <div className={styles.content}>
            <div className={styles.ids}>
              <CopyBadge label={`#${pathStopData.stop.id}`} value={pathStopData.stop.id} />
              <CopyBadge label={`${pathStopData.stop.lat}, ${pathStopData.stop.lon}`} value={`${pathStopData.stop.lat}	${pathStopData.stop.lon}`} />
            </div>
          </div>
        )}

        {/* {isThisStopSelected && <LinesExplorerContentPatternPathStopPdf lineId={linesExplorerContext.entities.line.id} stopId={pathStopData.stop.id} direction={linesExplorerContext.entities.pattern.direction} />} */}
      </div>
    </div>
  );

  //
}
