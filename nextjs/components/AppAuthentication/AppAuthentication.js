'use client';

/* * */

import styles from './AppAuthentication.module.css';

/* * */

export default function AppAuthentication({ children }) {
  //

  //
  // A. Setup variables

  //
  // C. Render components

  return (
    <div className={styles.container}>
      {/* {(status === 'loading' || status === 'authenticated') && <Loader visible fixed />} */}
      <div className={styles.content}>{children}</div>
    </div>
  )

  //
}
