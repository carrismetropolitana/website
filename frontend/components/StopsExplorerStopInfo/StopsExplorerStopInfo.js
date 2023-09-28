'use client';

import useSWR from 'swr';
import styles from './StopsExplorerStopInfo.module.css';
import Loader from '@/components/Loader/Loader';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import FacilityIcon from '@/components/Facilities/FacilityIcon';
import { NewLineBadge } from '@/components/NewLineBadge/NewLineBadge';
import StopName from '@/components/StopName/StopName';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';
import { useEffect, useState } from 'react';

/* * */

export default function StopsExplorerStopInfo() {
  //

  //
  // A. Setup variables

  const stopsExplorerContext = useStopsExplorerContext();
  const [selectedStopData, setSelectedStopData] = useState(null);

  //
  // B. Fetch data

  const { data: allStopsData, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Handle actions

  useEffect(() => {
    if (!allStopsData) return;
    const foundItem = allStopsData.find((item) => item.id === stopsExplorerContext.entities.stop_id);
    if (foundItem) setSelectedStopData(foundItem);
  }, [allStopsData, stopsExplorerContext.entities.stop_id]);

  //
  // D. Render components

  return (
    <div>
      {allStopsLoading && (
        <div className={styles.container}>
          <Loader visible />
        </div>
      )}
      {selectedStopData && (
        <div className={styles.container}>
          <div className={styles.badges}>
            <CopyBadge label={`#${selectedStopData.id}`} value={selectedStopData.id} />
            <CopyBadge label={`${selectedStopData.lat}, ${selectedStopData.lon}`} value={`${selectedStopData.lat}	${selectedStopData.lon}`} />
          </div>

          <StopName name={selectedStopData.name} tts_name={selectedStopData.tts_name} locality={selectedStopData.locality} municipality={selectedStopData.municipality_name} alignment="center" selected />

          {selectedStopData.facilities.length > 0 && (
            <div className={styles.equipments}>
              {selectedStopData.facilities.map((e, index) => (
                <FacilityIcon key={index} name={e} size={28} />
              ))}
            </div>
          )}
          {selectedStopData?.lines?.length > 0 && (
            <div className={styles.routes}>
              {selectedStopData.lines.map((lineId, index) => (
                <NewLineBadge key={index} id={lineId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
