/* * */

import styles from './LinesExplorerContentPatternPathStopName.module.css';
import AudioBadge from '@/components/AudioBadge/AudioBadge';

/* * */

export default function LinesExplorerContentPatternPathStopName({ stopData, isSelected = false }) {
  //

  // If none of the location strings are defined,
  // then return an empty React fragment.
  if (!stopData.locality && !stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
          {stopData.name} {isSelected && <AudioBadge type="stops" id={stopData.id} />}
        </h2>
      </div>
    );
  }

  // If only locality is defined, then return it.
  if (stopData.locality && !stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
          {stopData.name} {isSelected && <AudioBadge type="stops" id={stopData.id} />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.locality}</h6>
      </div>
    );
  }

  // If only municipality is defined, then return it.
  if (!stopData.locality && stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
          {stopData.name} {isSelected && <AudioBadge type="stops" id={stopData.id} />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.municipality_name}</h6>
      </div>
    );
  }

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (stopData.locality === stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
          {stopData.name} {isSelected && <AudioBadge type="stops" id={stopData.id} />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.locality}</h6>
      </div>
    );
  }

  // Return both if none of the previous conditions was matched.
  return (
    <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
      <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
        {stopData.name} {isSelected && <AudioBadge type="stops" id={stopData.id} />}
      </h2>
      <h6 className={styles.stopLocation}>
        {stopData.locality}, {stopData.municipality_name}
      </h6>
    </div>
  );

  //
}
