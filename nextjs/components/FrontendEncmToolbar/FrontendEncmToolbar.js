'use client';

import styles from './FrontendEncmToolbar.module.css';
import { IconArrowsMinimize, IconBrandGoogleMaps } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import FrontendEncmToolbarSearch from '@/components/FrontendEncmToolbarSearch/FrontendEncmToolbarSearch';

export default function FrontendEncmToolbar({ selectedMapStyle, onSelectMapStyle, onMapRecenter, onOpenInGoogleMaps, selectedEncmId, onSelectEncmId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmToolbar');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <SegmentedControl
        aria-label={t('map_style.label')}
        value={selectedMapStyle}
        onChange={onSelectMapStyle}
        data={[
          { value: 'map', label: t('map_style.options.map') },
          { value: 'satellite', label: t('map_style.options.satellite') },
        ]}
      />

      <Tooltip label={t('recenter_map.label')} position="bottom" withArrow>
        <ActionIcon color="gray" variant="light" size="lg" onClick={onMapRecenter} aria-label={t('recenter_map.label')}>
          <IconArrowsMinimize size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('open_gmaps.label')} position="bottom" withArrow>
        <ActionIcon color="gray" variant="light" size="lg" onClick={onOpenInGoogleMaps} aria-label={t('open_gmaps.label')}>
          <IconBrandGoogleMaps size={20} />
        </ActionIcon>
      </Tooltip>

      <div className={styles.fullWidth}>
        <FrontendEncmToolbarSearch selectedEncmId={selectedEncmId} onSelectEncmId={onSelectEncmId} />
      </div>
    </div>
  );
}
