import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathStop.module.css';
import StopLocationInfo from '@/components/StopLocationInfo/StopLocationInfo';
import CopyBadge from '../CopyBadge/CopyBadge';

//
//
//
//

export default function LinePatternPathStop({ index, stop_code, onSelect, selectedStop }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathStop');

  //
  // B. Fetch data

  const { data: stopData } = useSWR(stop_code && `https://api.carrismetropolitana.pt/stops/${stop_code}`);

  //
  // C. Handle actions

  const handleStopClick = () => {
    onSelect(stop_code);
  };

  //
  // D. Render components

  return (
    stopData && (
      <div className={`${styles.container} ${selectedStop === stop_code && styles.selected}`} onClick={handleStopClick}>
        <div className={styles.travelTime}>ttime</div>
        <div className={styles.spine}>
          <div className={styles.spineIcon}>
            <div className={styles.spineIconOuter}>
              <div className={styles.spineIconInner}></div>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.stopName}>{stopData.name}</h2>
            <StopLocationInfo locality={stopData.locality} municipality={stopData.municipality_name} />
            <div className={styles.facilities}></div>
          </div>
          {/* <div className={styles.body}>
            <div className={styles.ids}>
              <CopyBadge label={`#${stopData.code}`} value={stopData.code} />
              <CopyBadge label={`${stopData.latitude}, ${stopData.longitude}`} value={`${stopData.latitude}	${stopData.longitude}`} />
            </div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
            <div>stop info</div>
          </div> */}
        </div>
      </div>
    )
  );

  return (
    stopData && (
      <div className={styles.container}>
        <div className='stop_marker-container'>
          <div className='stop_marker_active'></div>
          <div className='stop_marker_icon'>
            <div className='outter'>
              <div className='inner'></div>
            </div>
          </div>
          <div className='stop_marker_dash'></div>
        </div>
        <div className='stop_info'>
          <div className='stop_header'>
            <p className='arrival_time'>arrival_time</p>
            <p className='stop_name'>item.stop_name</p>
          </div>
          <div className='stop_details'>
            <div className='pdf-container'></div>
            <p className='stop_id'>#item.stop_id</p>
          </div>
        </div>
      </div>
    )
  );
}
