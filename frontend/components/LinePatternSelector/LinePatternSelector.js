'use client';

import useSWR from 'swr';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '@mantine/core';
import styles from './LinePatternSelector.module.css';
import { useLineFormContext } from '@/forms/LineForm';
import LineDisplay, { LineBadge } from '@/components/NewLineBadge/NewLineBadge';

export default function LinePatternSelector() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternSelector');

  const [allPatternsData, setAllPatternsData] = useState([]);

  //
  // B. Fetch data

  const { data: lineData } = useSWR(lineForm.values.line_code && `https://api.carrismetropolitana.pt/lines/${lineForm.values.line_code}`);

  //
  // C. Format data

  useEffect(() => {
    (async function () {
      // Exit if lineDate is undefined
      if (!lineData) return;
      // Initiate a temporaty variable to hold formatted patterns
      let formattedPatternOptions = [];
      // Loop through each pattern to retrieve its info
      for (const patternCode of lineData.patterns) {
        // Fetch pattern info
        const response = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternCode}`);
        const patternData = await response.json();
        // Check if this pattern is valid on the selected date
        const isValidOnSelectedDate = patternData.valid_on.includes(lineForm.values.date_string);
        // Format response
        formattedPatternOptions.push({
          value: patternCode,
          label: patternData.headsign || 'no headsign',
          disabled: !isValidOnSelectedDate,
        });
      }
      // Update state with formatted patterns
      setAllPatternsData(formattedPatternOptions);
      // Pre-select the first pattern if none is selected
      if (!lineForm.values.pattern_code) {
        lineForm.setFieldValue('pattern_code', lineData.patterns[0]);
      }
      //
    })();
  }, [lineData, lineForm]);

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
    lineData &&
    allPatternsData && (
      <div className={styles.container}>
        <LineBadge short_name={lineData.short_name} color={lineData.color} text_color={lineData.text_color} />
        <p className={styles.destinationLabel}>{t('destination_label')}</p>
        <Select
          aria-label={t('form.pattern_code.label')}
          placeholder={t('form.pattern_code.placeholder')}
          nothingFound={t('form.pattern_code.nothingFound')}
          {...lineForm.getInputProps('pattern_code')}
          onChange={handleSelectPattern}
          data={allPatternsData}
          radius='sm'
          size='lg'
          w='100%'
          searchable
        />
      </div>
    )
  );
}
