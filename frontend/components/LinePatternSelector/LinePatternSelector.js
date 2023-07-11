'use client';

import useSWR from 'swr';
import { useMemo, forwardRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@mantine/core';
import styles from './LinePatternSelector.module.css';
import { useLineFormContext } from '@/forms/LineForm';
import LineDisplay, { LineBadge } from '@/components/LineDisplay/LineDisplay';

export default function LinePatternSelector() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternSelector');

  //
  // B. Fetch data

  const { data: lineData } = useSWR(lineForm.values.line_code && `https://api.carrismetropolitana.pt/lines/${lineForm.values.line_code}`);

  //
  // C. Format data

  const linePatternsFormatted = useMemo(() => {
    if (!lineData) return [];
    return lineData.patterns;
  }, [lineData]);

  //
  // C. Format data

  useEffect(() => {
    if (lineData && !lineForm.values.pattern_code) {
      lineForm.setFieldValue('pattern_code', lineData.patterns[0]);
    }
  }, [lineForm, lineData]);

  //
  // D. Handle actions

  const handleSelectPattern = (pattern_code) => {
    lineForm.setFieldValue('pattern_code', pattern_code);
    lineForm.setFieldValue('stop_code', '');
  };

  //
  // E. Render components

  const LinePatternSelectorSelectOption = forwardRef(({ label, color, text_color, short_name, long_name, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <LineDisplay short_name={short_name} long_name={long_name} color={color} text_color={text_color} />
      </div>
    );
  });

  LinePatternSelectorSelectOption.displayName = 'LinePatternSelectorSelectOption';

  return (
    lineData && (
      <div className={styles.container}>
        <LineBadge short_name={lineData.short_name} color={lineData.color} text_color={lineData.text_color} />
        <p className={styles.destinationLabel}>{t('destination_label')}</p>
        <Select
          aria-label={t('form.pattern_code.label')}
          placeholder={t('form.pattern_code.placeholder')}
          nothingFound={t('form.pattern_code.nothingFound')}
          {...lineForm.getInputProps('pattern_code')}
          onChange={handleSelectPattern}
          data={linePatternsFormatted}
          radius='sm'
          size='lg'
          w='100%'
          searchable
        />
      </div>
    )
  );
}
