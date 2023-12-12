'use client';

/* * */

import styles from './LinesExplorerContentDebug.module.css';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerContentDebug() {
  //

  //
  // A. Setup variables

  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <CopyBadge label={`pattern_id: ${linesExplorerContext.entities.pattern?.id}`} value={linesExplorerContext.entities.pattern?.id} />
      <CopyBadge label={`direction: ${linesExplorerContext.entities.pattern?.direction}`} value={linesExplorerContext.entities.pattern?.direction} />
      <CopyBadge label={`headsign: ${linesExplorerContext.entities.pattern?.headsign}`} value={linesExplorerContext.entities.pattern?.headsign} />
      <CopyBadge label={`line_color: ${linesExplorerContext.entities.line?.color}`} value={linesExplorerContext.entities.line?.color} />
      <CopyBadge label={`total stops: ${linesExplorerContext.entities.pattern?.path?.length}`} value={linesExplorerContext.entities.pattern?.path?.length} />
    </div>
  );

  //
}
