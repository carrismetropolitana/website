import styles from './StopLocationInfo.module.css';

export default function StopLocationInfo({ locality, municipality }) {
  //

  // If none of the location strings are defined,
  // then return an empty React fragment.
  if (!locality && !municipality) {
    return <></>;
  }

  // If only locality is defined, then return it.
  if (locality && !municipality) {
    return <div className={styles.container}>{locality}</div>;
  }

  // If only municipality is defined, then return it.
  if (!locality && municipality) {
    return <div className={styles.container}>{municipality}</div>;
  }

  // If both locality and municipality are the same,
  // return only one of them to avoid duplicate strings.
  if (locality === municipality) {
    return <div className={styles.container}>{locality}</div>;
  }

  // Return both if none of the previous conditions was matched.
  return <div className={styles.container}>{`${locality}, ${municipality}`}</div>;

  //
}
