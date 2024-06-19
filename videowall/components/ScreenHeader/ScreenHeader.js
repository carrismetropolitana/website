/* * */

import styles from './ScreenHeader.module.css';
import ScreenHeaderLogo from '@/components/ScreenHeaderLogo/ScreenHeaderLogo';

/* * */

export default function ScreenHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <ScreenHeaderLogo />
      </div>
    </div>
  );
}
