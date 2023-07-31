import useSWR from 'swr';
import styles from './StopInfo.module.css';
import Loader from '../Loader/Loader';
import CopyBadge from '../CopyBadge/CopyBadge';
import EquipmentIcon from '../FacilityIcon/FacilityIcon';
import { NewLineBadge } from '../NewLineBadge/NewLineBadge';

export default function StopInfo({ stopCode }) {
  //

  //
  // A. Setup variables

  //
  // B. Fetch data

  const { data: stopData, isLoading: stopLoading } = useSWR(stopCode && `https://api.carrismetropolitana.pt/stops/${stopCode}`);

  //
  // D. Handle actions

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
          {stopData.facilities.length > 0 && (
            <div className={styles.equipments}>
              {stopData.facilities.map((e, index) => (
                <EquipmentIcon key={index} name={e} />
              ))}
            </div>
          )}
          {stopData.lines.length > 0 && (
            <div className={styles.routes}>
              {stopData.lines.map((lineCode, index) => (
                <NewLineBadge key={index} code={lineCode} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
