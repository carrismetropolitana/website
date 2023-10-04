'use client';

import styles from './StopsExplorerStopInfo.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import FacilityIcon from '@/components/Facilities/FacilityIcon';
import { NewLineBadge } from '@/components/NewLineBadge/NewLineBadge';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';
import AudioBadge from '@/components/AudioBadge/AudioBadge';
import useStopLocation from '@/hooks/useStopLocation';

/* * */

export default function StopsExplorerStopInfo() {
  //

  //
  // A. Setup variables

  const stopsExplorerContext = useStopsExplorerContext();
  const stopLocation = useStopLocation(stopsExplorerContext.entities.stop);

  //
  // B. Render components

  return (
    stopsExplorerContext.entities.stop && (
      <div className={styles.container}>
        <div className={styles.badges}>
          <CopyBadge label={`#${stopsExplorerContext.entities.stop.id}`} value={stopsExplorerContext.entities.stop.id} />
          <CopyBadge label={`${stopsExplorerContext.entities.stop.lat}, ${stopsExplorerContext.entities.stop.lon}`} value={`${stopsExplorerContext.entities.stop.lat}	${stopsExplorerContext.entities.stop.lon}`} />
        </div>

        <div className={styles.nameAndLocation} aria-label={stopsExplorerContext.entities.stop.tts_name || stopsExplorerContext.entities.stop.name}>
          <h3 className={styles.stopName} aria-label={stopsExplorerContext.entities.stop.tts_name || stopsExplorerContext.entities.stop.name}>
            <AudioBadge type="stops" id={stopsExplorerContext.entities.stop.id} />
            {stopsExplorerContext.entities.stop.name}
          </h3>
          {stopLocation && <h5 className={styles.stopLocation}>{stopLocation}</h5>}
        </div>

        {stopsExplorerContext.entities.stop.facilities.length > 0 && (
          <div className={styles.facilities}>
            {stopsExplorerContext.entities.stop.facilities.map((e, index) => (
              <FacilityIcon key={index} name={e} size={28} />
            ))}
          </div>
        )}

        {stopsExplorerContext.entities.stop?.lines?.length > 0 && (
          <div className={styles.lines}>
            {stopsExplorerContext.entities.stop.lines.map((lineId, index) => (
              <NewLineBadge key={index} id={lineId} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
