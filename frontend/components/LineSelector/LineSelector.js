'use client';

import useSWR from 'swr';
import { useMemo, forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@mantine/core';
import styles from './LineSelector.module.css';
import { useLineFormContext } from '@/forms/LineForm';
import LineDisplay from '../NewLineBadge/NewLineBadge';

export default function LineSelector() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LineSelector');

  //
  // B. Fetch data

  const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');
  const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');

  //
  // C. Format data

  const allMunicipalitiesDataFormatted = useMemo(() => {
    if (!allMunicipalitiesData) return [];
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    allMunicipalitiesData.sort((a, b) => collator.compare(a.name, b.name));
    return allMunicipalitiesData.map((item) => {
      return { value: item.code, label: item.name };
    });
  }, [allMunicipalitiesData]);

  const allLinesDataFormatted = useMemo(() => {
    if (!allLinesData) return [];
    return allLinesData.map((item) => {
      return { value: item.code, label: `${item.short_name} - ${item.long_name}`, color: item.color, text_color: item.text_color, short_name: item.short_name, long_name: item.long_name };
    });
  }, [allLinesData]);

  //
  // D. Handle actions

  const handleSelectLine = (line_code) => {
    lineForm.setFieldValue('line_code', line_code);
    lineForm.setFieldValue('pattern_code', '');
    lineForm.setFieldValue('stop_code', '');
  };

  //
  // E. Render components

  const LineSelectorSelectOption = forwardRef(({ label, color, text_color, short_name, long_name, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <LineDisplay short_name={short_name} long_name={long_name} color={color} text_color={text_color} />
      </div>
    );
  });

  LineSelectorSelectOption.displayName = 'LineSelectorSelectOption';

  return (
    <div className={styles.container}>
      <div className={styles.mainSelect}>
        <Select
          aria-label={t('form.municipality_code.label')}
          placeholder={t('form.municipality_code.placeholder')}
          nothingFound={t('form.municipality_code.nothingFound')}
          {...lineForm.getInputProps('municipality_code')}
          data={allMunicipalitiesDataFormatted}
          radius="sm"
          size="lg"
          w="100%"
          searchable
        />
        <Select
          aria-label={t('form.line_code.label')}
          placeholder={t('form.line_code.placeholder')}
          nothingFound={t('form.line_code.nothingFound')}
          {...lineForm.getInputProps('line_code')}
          onChange={handleSelectLine}
          data={allLinesDataFormatted}
          itemComponent={LineSelectorSelectOption}
          radius="sm"
          size="lg"
          w="100%"
          searchable
        />
      </div>
    </div>
  );
}
