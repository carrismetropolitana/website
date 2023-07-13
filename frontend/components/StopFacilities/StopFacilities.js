import FacilityIcon from '@/components/FacilityIcon/FacilityIcon';
import styles from './StopFacilities.module.css';

export default function StopFacilities({ facilities }) {
  //

  return (
    facilities &&
    facilities.length > 0 && (
      <div className={styles.container}>
        {facilities.map((e, index) => (
          <FacilityIcon key={index} name={e} />
        ))}
      </div>
    )
  );

  //
}
