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

  const { data: lineData } = useSWR(lineForm.values.line_id && `https://api.carrismetropolitana.pt/lines/${lineForm.values.line_id}`);
  const { data: shapeData } = useSWR(lineForm.values.shape_id && `https://api.carrismetropolitana.pt/shapes/${lineForm.values.shape_id}`);

  //
  // C. Format data

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <OSMMap id="patternShapeMap" height={300} scrollZoom={false} mapStyle="map">
        {shapeData?.geojson && (
          <Source id="pattern-shape" type="geojson" data={shapeData.geojson}>
            <Layer id="pattern-shape" type="line" source="pattern-shape" layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': lineData ? lineData.color : '#000000', 'line-width': 4 }} />
          </Source>
        )}
      </OSMMap>
    </div>
  );
}
