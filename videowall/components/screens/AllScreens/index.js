/* * */

import Screen1 from '@/components/screens/Screen1';
import Screen2 from '@/components/screens/Screen2';
import Screen3 from '@/components/screens/Screen3';
import Screen4 from '@/components/screens/Screen4';
// import Screen5 from '@/components/screens/Screen5';
// import Screen6 from '@/components/screens/Screen6';
// import Screen7 from '@/components/screens/Screen7';
// import Screen8 from '@/components/screens/Screen8';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			{/* <Screen1 />
			<Screen2 /> */}
			<Screen3 />
			<Screen4 />
			<Screen3 />
			<Screen4 />
		</div>
	);
}
