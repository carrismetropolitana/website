/* * */

import styles from './ScreenAllScreens.module.css';
import Screen1 from '@/components/Screen1/Screen1';
import Screen2 from '@/components/Screen2/Screen2';
import Screen3 from '@/components/Screen3/Screen3';
import Screen4 from '@/components/Screen4/Screen4';
// import Screen5 from '@/components/Screen5/Screen5';
// import Screen6 from '@/components/Screen6/Screen6';
// import Screen7 from '@/components/Screen7/Screen7';
// import Screen8 from '@/components/Screen8/Screen8';

/* * */

export default function ScreenAllScreens() {
  return (
    <div className={styles.container}>
      <Screen1 />
      <Screen2 />
      <Screen3 />
      <Screen4 />
    </div>
  );
}
