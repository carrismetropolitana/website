import styles from './LiveIcon.module.css';
import { useTranslations } from 'next-intl';

export default function LiveIcon() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LiveIcon');

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <div className={styles.dot} />
      <div className={styles.ripple} />
    </div>
  );

  //
}
