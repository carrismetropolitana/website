'use client';

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';
import styles from './LinePatternMap.module.css';
import { useLineFormContext } from '@/forms/LineForm';

export default function LinePatternMap() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const { patternShapeMap } = useMap();
  const t = useTranslations('LinePatternMap');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_code && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_code}`);

  //
  // C. Format data

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <OSMMap id='patternShapeMap' height={300} scrollZoom={false} mapStyle='map'>
        {patternData?.shape?.geojson && (
          <Source id='pattern-shape' type='geojson' data={patternData.shape.geojson}>
            <Layer id='pattern-shape' type='line' source='pattern-shape' layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': patternData ? patternData.color : '#000000', 'line-width': 4 }} />
          </Source>
        )}
      </OSMMap>
    </div>
  );
}
