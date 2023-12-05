'use client';

/* * */

import styles from './LinesExplorerContentPatternPath.module.css';
import LinePatternPathStop from '@/components/LinesExplorerContentPatternPathStop/LinesExplorerContentPatternPathStop';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerContentPatternPath() {
  //

  //
  // A. Setup variables

  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div>{linesExplorerContext.entities.pattern.id}</div>
      {linesExplorerContext.entities.pattern.path?.map((pathStop, pathIndex) => (
        <div key={pathIndex}>
          <LinePatternPathStop pathStopData={pathStop} pathIndex={pathIndex} pathIndexMax={linesExplorerContext.entities.pattern.path.length - 1} />
        </div>
      ))}
    </div>
  );

  //
}
