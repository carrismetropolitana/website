import useSWR from 'swr';
import { useState, useEffect } from 'react';
import styles from './StopInfo.module.css';
import Loader from '../Loader/Loader';
import CopyBadge from '../CopyBadge/CopyBadge';
import EquipmentIcon from '../FacilityIcon/FacilityIcon';
import { LineBadge } from '../LineDisplay/LineDisplay';

export default function StopInfo({ stopCode }) {
  //

  //
  // A. Setup variables

  const [equipmentsForThisStop, setEquipmentsForThisStop] = useState([]);

  //
  // B. Fetch data

  const { data: stopData, isLoading: stopLoading } = useSWR(stopCode && `https://api.carrismetropolitana.pt/stops/${stopCode}`);

  //
  // D. Handle actions

  useEffect(() => {
    if (!stopData) return;
    setEquipmentsForThisStop([...stopData.near_services, ...stopData.intermodal_connections]);
  }, [stopData]);

  //
  // D. Render components

  return (
    <div>
      {stopLoading && <Loader visible />}
      {stopData && (
        <div className={styles.container}>
          <div className={styles.info}>
            <CopyBadge label={`#${stopData.code}`} value={stopData.code} />
            <CopyBadge label={`${stopData.lat}, ${stopData.lon}`} value={`${stopData.lat}	${stopData.lon}`} />
          </div>
          <div className={styles.stopNameLocationWrapper}>
            <h2 className={styles.stopName} aria-label={stopData.tts_name || stopData.name}>
              {stopData.name}
            </h2>
            {stopData.locality && <div className={styles.location}>{stopData.locality === stopData.municipality_name ? stopData.locality : `${stopData.locality}, ${stopData.municipality_name}`}</div>}
          </div>
          {equipmentsForThisStop.length > 0 && (
            <div className={styles.equipments}>
              {equipmentsForThisStop.map((e, index) => (
                <EquipmentIcon key={index} name={e} />
              ))}
            </div>
          )}
          <div className={styles.routes}>
            <LineBadge short_name='2030' />
            <LineBadge short_name='2024' />
            <LineBadge short_name='2034' />
          </div>
        </div>
      )}
    </div>
  );
}
