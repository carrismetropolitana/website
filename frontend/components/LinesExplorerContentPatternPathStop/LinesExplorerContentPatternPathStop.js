'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentPatternPathStop.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import LinesExplorerContentPatternPathStopTimetable from '@/components/LinesExplorerContentPatternPathStopTimetable/LinesExplorerContentPatternPathStopTimetable';
import { useMemo, useState } from 'react';
import LinesExplorerContentPatternPathStopPdf from '@/components/LinesExplorerContentPatternPathStopPdf/LinesExplorerContentPatternPathStopPdf';
import Text from '@/components/Text/Text';
import LinesExplorerContentPatternPathStopRealtime from '@/components/LinesExplorerContentPatternPathStopRealtime/LinesExplorerContentPatternPathStopRealtime';
import LinesExplorerContentPatternPathStopSpine from '@/components/LinesExplorerContentPatternPathStopSpine/LinesExplorerContentPatternPathStopSpine';
import LinesExplorerContentPatternPathStopName from '@/components/LinesExplorerContentPatternPathStopName/LinesExplorerContentPatternPathStopName';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

/* * */

export default function LinesExplorerContentPatternPathStop({ pathStopData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStop');
  const linesExplorerContext = useLinesExplorerContext();
  const [opened, { open, close }] = useDisclosure(false);

  //
  // B. Transform data

  const isThisStopSelected = useMemo(() => {
    return linesExplorerContext.entities.stop_id === pathStopData.stop.id;
  }, [linesExplorerContext.entities.stop_id, pathStopData.stop.id]);

  //
  // C. Handle actions

  const handleStopClick = () => {
    linesExplorerContext.selectStop(pathStopData.stop.id);
  };

  //
  // D. Render components

  return (
    <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
      <div className={styles.travelTime}></div>

      <LinesExplorerContentPatternPathStopSpine style={pathStopData.stop_sequence === 0 ? 'start' : 'regular'} color={linesExplorerContext.entities.pattern.color} text_color={linesExplorerContext.entities.pattern.text_color} isSelected={isThisStopSelected} />

      <div className={styles.info}>
        <div className={styles.header}>
          <div className={styles.ids}>
            <CopyBadge label={`#${pathStopData.stop.id}`} value={pathStopData.stop.id} />
            <CopyBadge label={`${pathStopData.stop.lat}, ${pathStopData.stop.lon}`} value={`${pathStopData.stop.lat}	${pathStopData.stop.lon}`} />
          </div>
          <LinesExplorerContentPatternPathStopName id={pathStopData.stop.id} name={pathStopData.stop.name} tts_name={pathStopData.stop.tts_name} locality={pathStopData.stop.localiy} municipality={pathStopData.stop.municipality} />
          {!isThisStopSelected && <LinesExplorerContentPatternPathStopRealtime patternId={linesExplorerContext.entities.pattern.id} stopId={pathStopData.stop.id} />}
        </div>

        {isThisStopSelected && (
          <div className={styles.body}>
            <Text type="mini-label">Próximas circulações</Text>
            <LinesExplorerContentPatternPathStopRealtime patternId={linesExplorerContext.entities.pattern.id} stopId={pathStopData.stop.id} />
          </div>
        )}

        <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Authentication" position="bottom">
          <div className={styles.body}>
            <Text type="mini-label">Horários previstos nesta paragem</Text>
            <LinesExplorerContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
            <LinesExplorerContentPatternPathStopPdf lineId={linesExplorerContext.entities.line.id} stopId={pathStopData.stop.id} direction={linesExplorerContext.entities.pattern.direction} />
          </div>
        </Drawer>

        <div className={styles.openTimetable} onClick={open}>
          Abrir Horários
        </div>

        {/* {isThisStopSelected && (
          <div className={styles.body}>
            <Text type="mini-label">Horários previstos nesta paragem</Text>
            <LinesExplorerContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
          </div>
        )} */}

        {/* {isThisStopSelected && <LinesExplorerContentPatternPathStopPdf lineId={linesExplorerContext.entities.line.id} stopId={pathStopData.stop.id} direction={linesExplorerContext.entities.pattern.direction} />} */}
      </div>
    </div>
  );

  //
}
