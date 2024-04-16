'use client';

/* * */

import styles from './FrontendLinesContentPatternPath.module.css';
import LinePatternPathStop from '@/components/FrontendLinesContentPatternPathStop/FrontendLinesContentPatternPathStop';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';

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
			{frontendLinesContext.entities.pattern.path?.map((pathStop, pathIndex) => <div key={pathIndex}>
				<LinePatternPathStop pathStopData={pathStop} pathIndex={pathIndex} pathIndexMax={frontendLinesContext.entities.pattern.path.length - 1} />
			</div>)}
		</div>
	);

	//
}