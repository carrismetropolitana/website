import useSWR from 'swr';
import { useState, useEffect, useMemo } from 'react';
import styles from './StopInfo.module.css';
import Loader from '../Loader/Loader';
import { Chip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import CopyBadge from '../CopyBadge/CopyBadge';
import EquipmentIcon from '../EquipmentIcon/EquipmentIcon';

export default function StopInfo({ stopId }) {
  //

  //
  // A. Setup variables

  const [equipmentsForThisStop, setEquipmentsForThisStop] = useState([]);

  //
  // B. Fetch data

  const { data: stopData, error: stopError, isLoading: stopLoading } = useSWR(stopId && `https://schedules.carrismetropolitana.pt/api/stops/${stopId}`);

  //
  // D. Handle actions

  useEffect(() => {
    if (!stopData) return;
    setEquipmentsForThisStop(['bus', 'bus', 'near_hospital', 'near_historic_building', 'subway']);
  }, [stopData]);

  //
  // D. Render components

  return (
    <>
      {stopLoading && <Loader visible full />}
      {stopData && (
        <div className={styles.container}>
          <div className={styles.info}>
            <CopyBadge label={`#${stopData.stop_id}`} value={stopData.stop_id} />
            <CopyBadge label={`${stopData.stop_lat}, ${stopData.stop_lon}`} value={`${stopData.stop_lat}	${stopData.stop_lon}`} />
          </div>
          <div className={styles.stopNameLocationWrapper}>
            <h2 className={styles.stopName}>{stopData.stop_name}</h2>
            <div className={styles.location}>Minas de Água, Sintra</div>
          </div>
          {equipmentsForThisStop.length > 0 && (
            <div className={styles.equipments}>
              {equipmentsForThisStop.map((e, index) => (
                <EquipmentIcon key={index} name={e} />
              ))}
            </div>
          )}
          {/* <div className={styles.routes}></div> */}
        </div>
      )}
    </>
  );
}
