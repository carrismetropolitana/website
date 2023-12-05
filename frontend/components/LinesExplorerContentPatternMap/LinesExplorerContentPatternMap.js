'use client';

/* * */

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import OSMMap from '@/components/OSMMap/OSMMap';
import styles from './LinesExplorerContentPatternMap.module.css';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerContentPatternMap() {
  //

  //
  // A. Setup variables

  const { patternShapeMap } = useMap();
  const t = useTranslations('LinesExplorerContentPatternMap');
  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Fetch data

  const { data: shapeData } = useSWR(linesExplorerContext.entities?.pattern?.shape_id && `https://api.carrismetropolitana.pt/shapes/${linesExplorerContext.entities.pattern.shape_id}`);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <OSMMap id="patternShapeMap" scrollZoom={false} mapStyle="map">
        {shapeData?.geojson && (
          <Source id="pattern-shape" type="geojson" data={shapeData.geojson}>
            <Layer id="pattern-shape" type="line" source="pattern-shape" layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': linesExplorerContext.entities?.pattern?.color ? linesExplorerContext.entities.pattern.color : '#000000', 'line-width': 4 }} />
          </Source>
        )}
      </OSMMap>
    </div>
  );

  //
}
