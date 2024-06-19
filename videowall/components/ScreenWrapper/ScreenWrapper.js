/* * */

import styles from './ScreenWrapper.module.css';
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader';

/* * */

export default function ScreenWrapper({ children }) {
  return (
    <div className={styles.container}>
      <ScreenHeader />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
