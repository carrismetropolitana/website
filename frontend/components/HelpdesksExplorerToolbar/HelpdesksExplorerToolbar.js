'use client';

import styles from './HelpdesksExplorerToolbar.module.css';
import { IconArrowsMinimize, IconBrandGoogleMaps } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import HelpdesksExplorerToolbarSearch from '@/components/HelpdesksExplorerToolbarSearch/HelpdesksExplorerToolbarSearch';

export default function HelpdesksExplorerToolbar({ selectedMapStyle, onSelectMapStyle, onMapRecenter, onOpenInGoogleMaps, selectedHelpdeskCode, onSelectHelpdeskCode }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorerToolbar');

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
        <ActionIcon color="gray" variant="light" size="lg" onClick={onMapRecenter}>
          <IconArrowsMinimize size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('open_gmaps.label')} position="bottom" withArrow>
        <ActionIcon color="gray" variant="light" size="lg" onClick={onOpenInGoogleMaps}>
          <IconBrandGoogleMaps size={20} />
        </ActionIcon>
      </Tooltip>

      <div className={styles.fullWidth}>
        <HelpdesksExplorerToolbarSearch selectedHelpdeskCode={selectedHelpdeskCode} onSelectHelpdeskCode={onSelectHelpdeskCode} />
      </div>
    </div>
  );
}
