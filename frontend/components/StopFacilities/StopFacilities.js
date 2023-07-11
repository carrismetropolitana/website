import EquipmentIcon from '../EquipmentIcon/EquipmentIcon';
import styles from './StopFacilities.module.css';

export default function StopFacilities({ facilities }) {
  //

  return facilities && facilities.length > 0 ? (
    <div className={styles.container}>
      <div className={styles.equipments}>
        {facilities.map((e, index) => (
          <EquipmentIcon key={index} name={e} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );

  //
}
