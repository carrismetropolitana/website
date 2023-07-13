import styles from './FacilityIcon.module.css';
import facilities from './facilities';
import { useTranslations } from 'next-intl';

export default function FacilityIcon({ name }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('equipments');

  //
  // D. Render components

  return (
    facilities[name] && (
      <div className={styles.container} aria-label={t(name)}>
        {facilities[name].svg}
      </div>
    )
  );

  //
}
