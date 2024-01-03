'use client';

/* * */

import styles from './FrontendStopsToolbar.module.css';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { IconArrowsMinimize, IconBrandGoogleMaps } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMap } from 'react-map-gl/maplibre';
import FrontendStopsToolbarSearch from '@/components/FrontendStopsToolbarSearch/FrontendStopsToolbarSearch';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';

/* * */

export default function FrontendStopsToolbar() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendStopsToolbar');
  const { frontendStopsMap } = useMap();
  const frontendStopsContext = useFrontendStopsContext();

  //
  // B. Handle actions

  const handleMapStyleChange = (value) => {
    frontendStopsContext.updateMap({ style: value });
  };

  const handleMapReCenter = () => {
    frontendStopsMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = frontendStopsMap.getCenter();
    const zoom = frontendStopsMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <SegmentedControl
          aria-label={t('map_style.label')}
          value={frontendStopsContext.map.style}
          onChange={handleMapStyleChange}
          data={[
            { value: 'map', label: t('map_style.options.map') },
            { value: 'satellite', label: t('map_style.options.satellite') },
          ]}
        />

        <Tooltip label={t('recenter_map.label')} position="bottom" withArrow>
          <ActionIcon color="gray" variant="light" size="lg" onClick={handleMapReCenter}>
            <IconArrowsMinimize size={20} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('open_gmaps.label')} position="bottom" withArrow>
          <ActionIcon color="gray" variant="light" size="lg" onClick={handleOpenInGoogleMaps}>
            <IconBrandGoogleMaps size={20} />
          </ActionIcon>
        </Tooltip>
      </div>

      <div className={styles.search}>
        <FrontendStopsToolbarSearch />
      </div>
    </div>
  );

  //
}
