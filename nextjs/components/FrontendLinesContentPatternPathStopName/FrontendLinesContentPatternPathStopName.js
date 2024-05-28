/* * */

import AudioBadge from '@/components/AudioBadge/AudioBadge'

import styles from './FrontendLinesContentPatternPathStopName.module.css'

/* * */

export default function FrontendLinesContentPatternPathStopName({ isSelected = false, stopData }) {
  //

  // If none of the location strings are defined,
  // then return an empty React fragment.
  if (!stopData.locality && !stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 aria-label={stopData.tts_name || stopData.name} className={styles.stopName}>
          {stopData.name}
          {' '}
          {isSelected && <AudioBadge id={stopData.id} type="stops" />}
        </h2>
      </div>
    )
  }

  // If only locality is defined, then return it.
  if (stopData.locality && !stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 aria-label={stopData.tts_name || stopData.name} className={styles.stopName}>
          {stopData.name}
          {' '}
          {isSelected && <AudioBadge id={stopData.id} type="stops" />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.locality}</h6>
      </div>
    )
  }

  // If only municipality is defined, then return it.
  if (!stopData.locality && stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 aria-label={stopData.tts_name || stopData.name} className={styles.stopName}>
          {stopData.name}
          {' '}
          {isSelected && <AudioBadge id={stopData.id} type="stops" />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.municipality_name}</h6>
      </div>
    )
  }

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (stopData.locality === stopData.municipality_name) {
    return (
      <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
        <h2 aria-label={stopData.tts_name || stopData.name} className={styles.stopName}>
          {stopData.name}
          {' '}
          {isSelected && <AudioBadge id={stopData.id} type="stops" />}
        </h2>
        <h6 className={styles.stopLocation}>{stopData.locality}</h6>
      </div>
    )
  }

  // Return both if none of the previous conditions was matched.
  return (
    <div className={`${styles.container} ${isSelected && styles.isSelected}`}>
      <h2 aria-label={stopData.tts_name || stopData.name} className={styles.stopName}>
        {stopData.name}
        {' '}
        {isSelected && <AudioBadge id={stopData.id} type="stops" />}
      </h2>
      <h6 className={styles.stopLocation}>
        {stopData.locality}
        ,
        {stopData.municipality_name}
      </h6>
    </div>
  )

  //
}
