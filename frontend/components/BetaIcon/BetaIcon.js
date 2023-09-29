'use client';

import styles from './BetaIcon.module.css';
import { useDebugContext } from '@/contexts/DebugContext';
import useDoubleClick from '@/hooks/useDoubleClick';

/* * */

export default function BetaIcon() {
  //

  //
  // A. Setup variables

  const debugContext = useDebugContext();

  //
  // B. Handle actions

  const handleClick = useDoubleClick({
    onDoubleClick: () => debugContext.toggleIsDebug(),
  });

  //
  // C. Render Components

  return (
    <div className={styles.beta} onClick={handleClick}>
      {debugContext.isDebug ? 'DEBUG' : 'BETA'}
    </div>
  );

  //
}
