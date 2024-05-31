/* * */

import styles from './styles.module.css';

/* * */

export default function FrontendText({ size, text }) {
	//

	if (size === 'heading') return (
		<h1 className={`${styles.default} ${styles.heading}`}>{text}</h1>
	);

	return (
		<p className={styles.default}>{text}</p>
	);

	//
}
