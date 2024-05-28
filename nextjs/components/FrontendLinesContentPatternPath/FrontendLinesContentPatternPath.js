'use client';

/* * */

import LinePatternPathStop from '@/components/FrontendLinesContentPatternPathStop/FrontendLinesContentPatternPathStop'
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext'

import styles from './FrontendLinesContentPatternPath.module.css'

/* * */

export default function FrontendLinesContentPatternPath() {
  //

  //
  // A. Setup variables

  const frontendLinesContext = useFrontendLinesContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      {frontendLinesContext.entities.pattern.path?.map((pathStop, pathIndex) => 
<div key={pathIndex}>
				<LinePatternPathStop pathStopData={pathStop} pathIndex={pathIndex} pathIndexMax={frontendLinesContext.entities.pattern.path.length - 1} />
			</div>


      )}
    </div>
  )

  //
}
