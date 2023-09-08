import useSWR from 'swr';
import styles from './StopInfo.module.css';
import Loader from '../Loader/Loader';
import CopyBadge from '../CopyBadge/CopyBadge';
import FacilityIcon from '../FacilityIcon/FacilityIcon';
import { NewLineBadge } from '../NewLineBadge/NewLineBadge';
import StopName from '../StopName/StopName';

export default function StopInfo({ selectedStopCode }) {
  //

  //
  // A. Setup variables

  //
  // B. Fetch data

  const { data: stopData, isLoading: stopLoading } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}`);

  //
  // D. Handle actions

  //
  // D. Render components

  return (
    <div>
      {stopLoading && (
        <div className={styles.container}>
          <Loader visible />
        </div>
      )}
      {stopData && (
        <div className={styles.container}>
          <div className={styles.badges}>
            <CopyBadge label={`#${stopData.code}`} value={stopData.code} />
            <CopyBadge label={`${stopData.lat}, ${stopData.lon}`} value={`${stopData.lat}	${stopData.lon}`} />
          </div>

          <StopName name={stopData.name} tts_name={stopData.tts_name} locality={stopData.locality} municipality={stopData.municipality_name} alignment="center" selected />

          {stopData.facilities.length > 0 && (
            <div className={styles.equipments}>
              {stopData.facilities.map((e, index) => (
                <FacilityIcon key={index} name={e} />
              ))}
            </div>
          )}
          {stopData?.lines?.length > 0 && (
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
