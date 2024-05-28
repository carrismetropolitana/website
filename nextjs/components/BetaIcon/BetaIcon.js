'use client';

/* * */

import { useDebugContext } from '@/contexts/DebugContext'
import useDoubleClick from '@/hooks/useDoubleClick'

import styles from './BetaIcon.module.css'

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
      {debugContext.isDebug ? 'DEBUG' : 'LIVE'}
    </div>
  )

  //
}
