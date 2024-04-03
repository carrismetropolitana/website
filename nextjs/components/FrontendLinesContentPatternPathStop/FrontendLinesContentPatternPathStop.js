'use client';

/* * */

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './FrontendLinesContentPatternPathStop.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import FrontendLinesSelectDate from '@/components/FrontendLinesSelectDate/FrontendLinesSelectDate';
import FrontendLinesContentPatternPathStopPdf from '@/components/FrontendLinesContentPatternPathStopPdf/FrontendLinesContentPatternPathStopPdf';
import FrontendLinesContentPatternPathStopTimetable from '@/components/FrontendLinesContentPatternPathStopTimetable/FrontendLinesContentPatternPathStopTimetable';
import FrontendLinesContentPatternPathStopRealtime from '@/components/FrontendLinesContentPatternPathStopRealtime/FrontendLinesContentPatternPathStopRealtime';
import FrontendLinesContentPatternPathStopSpine from '@/components/FrontendLinesContentPatternPathStopSpine/FrontendLinesContentPatternPathStopSpine';
import FrontendLinesContentPatternPathStopName from '@/components/FrontendLinesContentPatternPathStopName/FrontendLinesContentPatternPathStopName';

/* * */

export default function FrontendLinesContentPatternPathStop({ pathStopData, pathIndex, pathIndexMax }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesContentPatternPathStop');
	const FrontendLinesContext = useFrontendLinesContext();
	const [opened, { open, close }] = useDisclosure(false);

	//
	// B. Transform data

	const isThisStopSelected = useMemo(() => {
		const isSameStopId = FrontendLinesContext.entities.stop?.id === pathStopData.stop.id;
		const isSameStopSequence = FrontendLinesContext.entities.stop_sequence === pathStopData.stop_sequence;
		return isSameStopId && isSameStopSequence;
	}, [FrontendLinesContext.entities.stop, FrontendLinesContext.entities.stop_sequence, pathStopData]);

	//
	// C. Handle actions

	const handleStopClick = () => {
		FrontendLinesContext.selectStop(pathStopData.stop, pathStopData.stop_sequence);
	};

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${isThisStopSelected && styles.selected}`} onClick={handleStopClick}>
			<div className={styles.travelTime} />

			<FrontendLinesContentPatternPathStopSpine style={pathIndex === 0 ? 'start' : pathIndex === pathIndexMax ? 'end' : 'regular'} color={FrontendLinesContext.entities.pattern.color} textColor={FrontendLinesContext.entities.pattern.text_color} isSelected={isThisStopSelected} />

			<div className={styles.innerWrapper}>
				<div className={styles.stopInfo}>
					<FrontendLinesContentPatternPathStopName stopData={pathStopData.stop} isSelected={isThisStopSelected} />
					{!isThisStopSelected && <FrontendLinesContentPatternPathStopRealtime patternId={FrontendLinesContext.entities.pattern.id} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} showScheduledArrivals={false} showLabel={false} />}
				</div>

				{isThisStopSelected && <FrontendLinesContentPatternPathStopRealtime patternId={FrontendLinesContext.entities.pattern.id} stopId={pathStopData.stop.id} stopSequence={pathStopData.stop_sequence} />}

				{isThisStopSelected &&
					<div className={`${styles.content} ${styles.onlyDesktop}`}>
						<p className={styles.label}>Horários previstos nesta paragem:</p>
						<FrontendLinesSelectDate />
						<FrontendLinesContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
						{/* <FrontendLinesContentPatternPathStopPdf lineId={FrontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={FrontendLinesContext.entities.pattern.direction} /> */}
					</div>
				}

				<Drawer radius='md' opened={opened} onClose={close} title='Horários previstos nesta paragem' position='bottom'>
					<div className={styles.content}>
						<p className={styles.label}>Horários previstos de passagem na paragem {pathStopData.stop.name}:</p>
						<FrontendLinesSelectDate />
						<FrontendLinesContentPatternPathStopTimetable stopSequence={pathStopData.stop_sequence} stopId={pathStopData.stop.id} />
						{/* <FrontendLinesContentPatternPathStopPdf lineId={FrontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={FrontendLinesContext.entities.pattern.direction} /> */}
					</div>
				</Drawer>

				{isThisStopSelected &&
					<div className={`${styles.openTimetable} ${styles.onlyMobile}`} onClick={open}>
						Abrir Horários
					</div>
				}

				{isThisStopSelected &&
					<div className={styles.content}>
						<div className={styles.ids}>
							<CopyBadge label={`#${pathStopData.stop.id}`} value={pathStopData.stop.id} />
							<CopyBadge label={`${pathStopData.stop.lat}, ${pathStopData.stop.lon}`} value={`${pathStopData.stop.lat}	${pathStopData.stop.lon}`} />
						</div>
					</div>
				}

				{/* {isThisStopSelected && <FrontendLinesContentPatternPathStopPdf lineId={FrontendLinesContext.entities.line.id} stopId={pathStopData.stop.id} direction={FrontendLinesContext.entities.pattern.direction} />} */}
			</div>
		</div>
	);

	//
}