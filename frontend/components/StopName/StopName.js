import AudioBadge from '../AudioBadge/AudioBadge';
import Text from '../Text/Text';
import styles from './StopName.module.css';

export default function StopName({ id, name, tts_name, locality, municipality, selected = false, alignment = 'flex-start' }) {
  //

  // If none of the location strings are defined,
  // then return an empty React fragment.
  if (!locality && !municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text type={selected ? 'h2' : 'h3'} aria-label={tts_name || name}>
          {name} <AudioBadge type="stops" id={id} />
        </Text>
      </div>
    );
  }

  // If only locality is defined, then return it.
  if (locality && !municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text type={selected ? 'h2' : 'h3'} aria-label={tts_name || name}>
          {name} <AudioBadge type="stops" id={id} />
        </Text>
        <Text type="subtitle">{locality}</Text>
      </div>
    );
  }

  // If only municipality is defined, then return it.
  if (!locality && municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text type={selected ? 'h2' : 'h3'} aria-label={tts_name || name}>
          {name} <AudioBadge type="stops" id={id} />
        </Text>
        <Text type="subtitle">{municipality}</Text>
      </div>
    );
  }

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (locality === municipality) {
    return (
      <div className={`${styles.container} ${styles[alignment]}`}>
        <Text type={selected ? 'h2' : 'h3'} aria-label={tts_name || name}>
          {name} <AudioBadge type="stops" id={id} />
        </Text>
        <Text type="subtitle">{locality}</Text>
      </div>
    );
  }

  // Return both if none of the previous conditions was matched.
  return (
    <div className={`${styles.container} ${styles[alignment]}`}>
      <Text type={selected ? 'h2' : 'h3'} aria-label={tts_name || name}>
        {name} <AudioBadge type="stops" id={id} />
      </Text>
      <Text type="subtitle">
        {locality}, {municipality}
      </Text>
    </div>
  );

  //
}
