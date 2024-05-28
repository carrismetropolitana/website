'use client';

/* * */

import CopyBadge from '@/components/CopyBadge/CopyBadge'
import FrontendLinesContentPatternPathStopName from '@/components/FrontendLinesContentPatternPathStopName/FrontendLinesContentPatternPathStopName'
import FrontendLinesContentPatternPathStopRealtime from '@/components/FrontendLinesContentPatternPathStopRealtime/FrontendLinesContentPatternPathStopRealtime'
import FrontendLinesContentPatternPathStopSpine from '@/components/FrontendLinesContentPatternPathStopSpine/FrontendLinesContentPatternPathStopSpine'
// import FrontendLinesContentPatternPathStopPdf from '@/components/FrontendLinesContentPatternPathStopPdf/FrontendLinesContentPatternPathStopPdf';
import FrontendLinesContentPatternPathStopTimetable from '@/components/FrontendLinesContentPatternPathStopTimetable/FrontendLinesContentPatternPathStopTimetable'
import FrontendLinesSelectDate from '@/components/FrontendLinesSelectDate/FrontendLinesSelectDate'
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext'
// import { useTranslations } from 'next-intl';
import { Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMemo } from 'react'

import styles from './FrontendLinesContentPatternPathStop.module.css'

/* * */

export default function FrontendLinesContentPatternPathStop({ pathIndex, pathIndexMax, pathStopData }) {
  //

  //
  // A. Setup variables

  // const t = useTranslations('FrontendLinesContentPatternPathStop');
  const frontendLinesContext = useFrontendLinesContext();
  const [opened, { close, open }] = useDisclosure();

  //
  // B. Transform data

  const isThisStopSelected = useMemo(() => {
    const isSameStopId = frontendLinesContext.entities.stop?.id === pathStopData.stop.id;
    const isSameStopSequence = frontendLinesContext.entities.stop_sequence === pathStopData.stop_sequence;
    return isSameStopId && isSameStopSequence;
  }, [frontendLinesContext.entities.stop, frontendLinesContext.entities.stop_sequence, pathStopData]);

  //
  // C. Handle actions

  const handleStopClick = () => {
    frontendLinesContext.selectStop(pathStopData.stop, pathStopData.stop_sequence);
  };

  //
  // D. Render components

  return (
    <div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
      <div className={styles.travelTime} />

      <FrontendLinesContentPatternPathStopSpine color={frontendLinesContext.entities.pattern.color} isSelected={isThisStopSelected} style={pathIndex === 0 ? 'start' : pathIndex === pathIndexMax ? 'end' : 'regular'} textColor={frontendLinesContext.entities.pattern.text_color} />

      <div className={styles.innerWrapper}>
        <div className={styles.stopInfo}>
          <FrontendLinesContentPatternPathStopName isSelected={isThisStopSelected} stopData={pathStopData.stop} />
          {!isThisStopSelected && <FrontendLinesContentPatternPathStopRealtime patternId={frontendLinesContext.entities.pattern.id} showLabel={false} showScheduledArrivals={false} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />}
        </div>

        {isThisStopSelected && <FrontendLinesContentPatternPathStopRealtime patternId={frontendLinesContext.entities.pattern.id} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />}

        {isThisStopSelected &&
					<div className={`${styles.content} ${styles.onlyDesktop}`}>
  <p className={styles.label}>Horários previstos nesta paragem:</p>
  <FrontendLinesSelectDate />
  <FrontendLinesContentPatternPathStopTimetable stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />
  {/* <FrontendLinesContentPatternPathStopPdf lineId={frontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={frontendLinesContext.entities.pattern.direction} /> */}
        </div>}

        <Drawer onClose={close} opened={opened} position="bottom" radius="md" title="Horários previstos nesta paragem">
          <div className={styles.content}>
            <p className={styles.label}>
              Horários previstos de passagem na paragem
              {pathStopData.stop.name}
              :
            </p>
            <FrontendLinesSelectDate />
            <FrontendLinesContentPatternPathStopTimetable stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />
            {/* <FrontendLinesContentPatternPathStopPdf lineId={frontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={frontendLinesContext.entities.pattern.direction} /> */}
          </div>
        </Drawer>

        {isThisStopSelected &&
					<div className={`${styles.openTimetable} ${styles.onlyMobile}`} onClick={open}>
  Abrir Horários
        </div>}

        {isThisStopSelected &&
					<div className={styles.content}>
  <div className={styles.ids}>
    <CopyBadge label={`#${pathStopData.stop.id}`} value={pathStopData.stop.id} />
    <CopyBadge label={`${pathStopData.stop.lat}, ${pathStopData.stop.lon}`} value={`${pathStopData.stop.lat}	${pathStopData.stop.lon}`} />
  </div>
        </div>}

        {/* {isThisStopSelected && <FrontendLinesContentPatternPathStopPdf lineId={frontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={frontendLinesContext.entities.pattern.direction} />} */}
      </div>
    </div>
  )

  //
}
