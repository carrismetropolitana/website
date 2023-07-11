import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPath.module.css';
import LinePatternPathStop from '../LinePatternPathStop/LinePatternPathStop';
import { useState } from 'react';

export default function LinePatternPath() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPath');

  const [selectedStop, setSelectedStop] = useState('');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_code && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_code}`);

  //
  // C. Format data

  //
  // D. Render components

  return (
    patternData && (
      <div className={styles.container}>
        {patternData.path.map((pathStop, pathIndex) => (
          <div key={pathIndex}>
            <LinePatternPathStop index={pathIndex} stop_code={pathStop.stop.code} onSelect={setSelectedStop} isSelected={selectedStop === pathStop.stop.code} />
          </div>
        ))}
      </div>
    )
  );
}
