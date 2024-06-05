/* * */

import styles from './Loader.module.css';

/* * */

export default function Loader({ fixed, full, maxed, size = 30, visible }) {
	//

	if (!visible) return <div />;

	// Setup spinner
	const Spinner = () => <div className={styles.spinner} style={{ borderWidth: size / 7, height: size, width: size }} />;

	// If
	if (full) {
		return (
			<div className={styles.full}>
				<Spinner />
			</div>
		);
	}

	// If
	if (maxed) {
		return (
			<div className={styles.maxed}>
				<Spinner />
			</div>
		);
	}

	// If
	if (fixed) {
		return (
			<div className={styles.fixed}>
				<Spinner />
			</div>
		);
	}

	return <Spinner />;

	//
}
