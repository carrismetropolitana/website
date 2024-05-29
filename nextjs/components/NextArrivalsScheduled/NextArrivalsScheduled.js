/* * */

import styles from './NextArrivalsScheduled.module.css';

/* * */

export default function NextArrivalsScheduled({ arrivalTimeString }) {
	return <p className={styles.container}>{arrivalTimeString}</p>;
}
