'use client';

/* * */

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

  const frontendStopsContext = useFrontendStopsContext();
  const stopLocation = useStopLocation(frontendStopsContext.entities.stop);

  //
  // B. Render components

  return (
    frontendStopsContext.entities.stop && (
      <div className={styles.container}>
        <div className={styles.badges}>
          <CopyBadge label={`#${frontendStopsContext.entities.stop.id}`} value={frontendStopsContext.entities.stop.id} />
          <CopyBadge label={`${frontendStopsContext.entities.stop.lat}, ${frontendStopsContext.entities.stop.lon}`} value={`${frontendStopsContext.entities.stop.lat}	${frontendStopsContext.entities.stop.lon}`} />
        </div>

        <div className={styles.nameAndLocation} aria-label={frontendStopsContext.entities.stop.tts_name || frontendStopsContext.entities.stop.name}>
          <h3 className={styles.stopName} aria-label={frontendStopsContext.entities.stop.tts_name || frontendStopsContext.entities.stop.name}>
            <AudioBadge type="stops" id={frontendStopsContext.entities.stop.id} />
            {frontendStopsContext.entities.stop.name}
          </h3>
          {stopLocation && <h5 className={styles.stopLocation}>{stopLocation}</h5>}
        </div>

        {frontendStopsContext.entities.stop.facilities.length > 0 && (
          <div className={styles.facilities}>
            {frontendStopsContext.entities.stop.facilities.map((e, index) => (
              <FacilityIcon key={index} name={e} size={28} />
            ))}
          </div>
        )}

        {frontendStopsContext.entities.stop?.lines?.length > 0 && (
          <div className={styles.lines}>
            {frontendStopsContext.entities.stop.lines.map((lineId, index) => (
              <NewLineBadge key={index} id={lineId} />
            ))}
          </div>
        )}
      </div>
    )
  );

  //
}
