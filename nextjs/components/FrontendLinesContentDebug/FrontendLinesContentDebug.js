'use client';

/* * */

import styles from './FrontendLinesContentDebug.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';

/* * */

export default function FrontendLinesContentDebug() {
	//

	//
	// A. Setup variables

	const frontendLinesContext = useFrontendLinesContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<CopyBadge label={`pattern_id: ${frontendLinesContext.entities.pattern?.id}`} value={frontendLinesContext.entities.pattern?.id} />
			<CopyBadge label={`direction: ${frontendLinesContext.entities.pattern?.direction}`} value={frontendLinesContext.entities.pattern?.direction} />
			<CopyBadge label={`headsign: ${frontendLinesContext.entities.pattern?.headsign}`} value={frontendLinesContext.entities.pattern?.headsign} />
			<CopyBadge label={`line_color: ${frontendLinesContext.entities.line?.color}`} value={frontendLinesContext.entities.line?.color} />
			<CopyBadge label={`total stops: ${frontendLinesContext.entities.pattern?.path?.length}`} value={frontendLinesContext.entities.pattern?.path?.length} />
		</div>
	);

	//
}