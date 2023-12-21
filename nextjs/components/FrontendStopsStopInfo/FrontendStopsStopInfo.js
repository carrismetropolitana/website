'use client';

import styles from './FrontendStopsStopInfo.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import FacilityIcon from '@/components/Facilities/FacilityIcon';
import { NewLineBadge } from '@/components/NewLineBadge/NewLineBadge';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import AudioBadge from '@/components/AudioBadge/AudioBadge';
import useStopLocation from '@/hooks/useStopLocation';

/* * */

export default function FrontendStopsStopInfo() {
  //

  //
  // A. Setup variables

  const FrontendStopsContext = useFrontendStopsContext();
  const stopLocation = useStopLocation(FrontendStopsContext.entities.stop);

  //
  // B. Render components

  return (
    FrontendStopsContext.entities.stop && (
      <div className={styles.container}>
        <div className={styles.badges}>
          <CopyBadge label={`#${FrontendStopsContext.entities.stop.id}`} value={FrontendStopsContext.entities.stop.id} />
          <CopyBadge label={`${FrontendStopsContext.entities.stop.lat}, ${FrontendStopsContext.entities.stop.lon}`} value={`${FrontendStopsContext.entities.stop.lat}	${FrontendStopsContext.entities.stop.lon}`} />
        </div>

        <div className={styles.nameAndLocation} aria-label={FrontendStopsContext.entities.stop.tts_name || FrontendStopsContext.entities.stop.name}>
          <h3 className={styles.stopName} aria-label={FrontendStopsContext.entities.stop.tts_name || FrontendStopsContext.entities.stop.name}>
            <AudioBadge type="stops" id={FrontendStopsContext.entities.stop.id} />
            {FrontendStopsContext.entities.stop.name}
          </h3>
          {stopLocation && <h5 className={styles.stopLocation}>{stopLocation}</h5>}
        </div>

        {FrontendStopsContext.entities.stop.facilities.length > 0 && (
          <div className={styles.facilities}>
            {FrontendStopsContext.entities.stop.facilities.map((e, index) => (
              <FacilityIcon key={index} name={e} size={28} />
            ))}
          </div>
        )}

        {FrontendStopsContext.entities.stop?.lines?.length > 0 && (
          <div className={styles.lines}>
            {FrontendStopsContext.entities.stop.lines.map((lineId, index) => (
              <NewLineBadge key={index} id={lineId} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
