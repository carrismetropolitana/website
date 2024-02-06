'use client';

/* * */

import { Tabs } from '@mantine/core';
import { IconMap, IconPhoto } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import styles from './FrontendDemandDateLineStop.module.css';
import FrontendDemandDateLineStopViewOne from '@/components/FrontendDemandDateLineStopViewOne/FrontendDemandDateLineStopViewOne';
import FrontendDemandDateLineStopViewTwo from '../FrontendDemandDateLineStopViewTwo/FrontendDemandDateLineStopViewTwo';

/* * */

export default function FrontendDemandDateLineStop() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendDemandDateLineStop');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.introWrapper}>
        <h3 className={styles.title}>{t('intro.title')}</h3>
        <p className={styles.title}>{t('intro.description')}</p>
      </div>
      <div className={styles.tabsWrapper}>
        <Tabs defaultValue="view_one" keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value="view_one" leftSection={<IconMap />}>
              {t('tabs.view_one')}
            </Tabs.Tab>
            <Tabs.Tab value="view_two" leftSection={<IconPhoto />}>
              {t('tabs.view_two')}
            </Tabs.Tab>
            <Tabs.Tab value="view_three" leftSection={<IconPhoto />}>
              {t('tabs.view_three')}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="view_one">
            <div className={styles.tabPanelWrapper}>
              <FrontendDemandDateLineStopViewOne />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="view_two">
            <div className={styles.tabPanelWrapper}>
              <FrontendDemandDateLineStopViewTwo />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="view_three">
            <div className={styles.tabPanelWrapper}>View Three</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );

  //
}
