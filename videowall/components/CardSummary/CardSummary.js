/* * */

import { Progress } from '@mantine/core';
import { useTranslations } from 'next-intl';
import CardTemplate from '@/components/CardTemplate/CardTemplate';
import BigNumber from '@/components/BigNumber/BigNumber';
import styles from './CardSummary.module.css';

/* * */

const COLORS = ['blue', 'orange', 'green', 'red'];

/* * */

export default function CardSummary({ title = '', timestamp = '', startDate = '', endDate = '', bigNumber = -1, comparison = 0, sections = [], isLoading = false, isValidating = false }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('CardSummary');

  //
  // B. Render components

  return (
    <CardTemplate title={title} timestamp={timestamp} isLoading={isLoading} isValidating={isValidating} startDate={startDate} endDate={endDate}>
      <div className={styles.leftSection}>
        <BigNumber value={bigNumber} level={1} />
        <div className={styles.comparison}>{t('percentage', { value: comparison })}</div>
      </div>
      <div className={styles.body}>
        <Progress.Root size={40} transitionDuration={200}>
          {sections.length > 0 &&
            sections.map((item, index) => (
              <Progress.Section key={index} value={item.percentage} color={COLORS[index]}>
                <Progress.Label>{t('percentage', { value: item.percentage })}</Progress.Label>
              </Progress.Section>
            ))}
        </Progress.Root>
      </div>
      <div className={styles.footer}>
        {sections.length > 0 &&
          sections.map((item, index) => (
            <div key={index} className={styles.columnWrapper}>
              <div className={styles.colTitle}>{item.label}</div>
              <div className={styles.colValue}>{t('number', { value: item.value })}</div>
            </div>
          ))}
      </div>
    </CardTemplate>
  );

  //
}
