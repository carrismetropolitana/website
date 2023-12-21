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

  const FrontendLinesContext = useFrontendLinesContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <CopyBadge label={`pattern_id: ${FrontendLinesContext.entities.pattern?.id}`} value={FrontendLinesContext.entities.pattern?.id} />
      <CopyBadge label={`direction: ${FrontendLinesContext.entities.pattern?.direction}`} value={FrontendLinesContext.entities.pattern?.direction} />
      <CopyBadge label={`headsign: ${FrontendLinesContext.entities.pattern?.headsign}`} value={FrontendLinesContext.entities.pattern?.headsign} />
      <CopyBadge label={`line_color: ${FrontendLinesContext.entities.line?.color}`} value={FrontendLinesContext.entities.line?.color} />
      <CopyBadge label={`total stops: ${FrontendLinesContext.entities.pattern?.path?.length}`} value={FrontendLinesContext.entities.pattern?.path?.length} />
    </div>
  );

  //
}
