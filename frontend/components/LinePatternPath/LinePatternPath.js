import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPath.module.css';
import LinePatternPathStop from '../LinePatternPathStop/LinePatternPathStop';
import { useEffect } from 'react';

export default function LinePatternPath() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPath');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_code && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_code}`);

  //
  // C. Format data

  useEffect(() => {
    if (patternData && !lineForm.values.stop_code) {
      lineForm.setFieldValue('stop_code', patternData.path[0].stop.code);
    }
  }, [lineForm, patternData]);

  //
  // D. Render components

  return (
    patternData && (
      <div className={styles.container}>
        <div>{patternData.code}</div>
        {patternData.path.map((pathStop, pathIndex) => (
          <div key={pathIndex}>
            <LinePatternPathStop index={pathIndex} stop_code={pathStop.stop.code} />
          </div>
        ))}
      </div>
    )
  );
}
