/* * */

import AudioBadge from '@/components/AudioBadge/AudioBadge'
import Text from '@/components/Text/Text'

import styles from './StopName.module.css'

/* * */

export default function StopName({ alignment = 'flex-start', id, locality, municipality, name, selected = false, tts_name }) {
  //

  // If none of the location strings are defined,
  // then return an empty React fragment.
  if (!locality && !municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text aria-label={tts_name || name} type={selected ? 'h2' : 'h3'}>
          {name}
          {' '}
          <AudioBadge id={id} type="stops" />
        </Text>
      </div>
    )
  }

  // If only locality is defined, then return it.
  if (locality && !municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text aria-label={tts_name || name} type={selected ? 'h2' : 'h3'}>
          {name}
          {' '}
          <AudioBadge id={id} type="stops" />
        </Text>
        <Text type="subtitle">{locality}</Text>
      </div>
    )
  }

  // If only municipality is defined, then return it.
  if (!locality && municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text aria-label={tts_name || name} type={selected ? 'h2' : 'h3'}>
          {name}
          {' '}
          <AudioBadge id={id} type="stops" />
        </Text>
        <Text type="subtitle">{municipality}</Text>
      </div>
    )
  }

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (locality === municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text aria-label={tts_name || name} type={selected ? 'h2' : 'h3'}>
          {name}
          {' '}
          <AudioBadge id={id} type="stops" />
        </Text>
        <Text type="subtitle">{locality}</Text>
      </div>
    )
  }

  // Return both if none of the previous conditions was matched.
  return (
    <div className={`${styles.container} ${styles[alignment]}`}>
      <Text aria-label={tts_name || name} type={selected ? 'h2' : 'h3'}>
        {name}
        {' '}
        <AudioBadge id={id} type="stops" />
      </Text>
      <Text type="subtitle">
        {locality}
        ,
        {municipality}
      </Text>
    </div>
  )

  //
}
