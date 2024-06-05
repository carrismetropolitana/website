/* * */

import styles from './styles.module.css';

/* * */

export default function FrontendText({ className, size, text }) {
	//

	if (size === 'heading') return (
		<h1 className={`${styles.default} ${styles.heading} ${className}`}>{text}</h1>
	);

	return (
		<p className={`${styles.default} ${className}`}>{text}</p>
	);

	//
}
