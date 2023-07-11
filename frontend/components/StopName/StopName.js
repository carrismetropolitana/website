import styles from './StopName.module.css';

export default function StopName({ code, name, short_name, tts_name, size }) {
  //

  return (
    <h2 className={`${styles.text} ${size}`} aria-label={tts_name || name}>
      {name}
    </h2>
  );

  //
}
