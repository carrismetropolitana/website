import useSWR from 'swr';
import styles from './StopInfo.module.css';
import Loader from '@/components/Loader/Loader';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import FacilityIcon from '@/components/Facilities/FacilityIcon';
import { NewLineBadge } from '@/components/NewLineBadge/NewLineBadge';
import StopName from '@/components/StopName/StopName';

export default function StopInfo({ selectedStopId }) {
  //

  //
  // A. Setup variables

  //
  // B. Fetch data

  const { data: stopData, isLoading: stopLoading } = useSWR(selectedStopId && `https://api.carrismetropolitana.pt/stops/${selectedStopId}`);

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
            <CopyBadge label={`#${stopData.id}`} value={stopData.id} />
            <CopyBadge label={`${stopData.lat}, ${stopData.lon}`} value={`${stopData.lat}	${stopData.lon}`} />
          </div>

          <StopName name={stopData.name} tts_name={stopData.tts_name} locality={stopData.locality} municipality={stopData.municipality_name} alignment="center" selected />

          {stopData.facilities.length > 0 && (
            <div className={styles.equipments}>
              {stopData.facilities.map((e, index) => (
                <FacilityIcon key={index} name={e} size={28} />
              ))}
            </div>
          )}
          {stopData?.lines?.length > 0 && (
            <div className={styles.routes}>
              {stopData.lines.map((lineId, index) => (
                <NewLineBadge key={index} id={lineId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
