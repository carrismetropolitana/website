/* * */

import styles from './styles.module.css';

/* * */

export default function Loader({ fill = false, fixed = false, full = false, size = 30, visible = false }) {
	//

	if (!visible) return;

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
	if (fixed) {
		return (
			<div className={styles.fixed}>
				<Spinner />
			</div>
		);
	}

	// If
	if (fill) {
		return (
			<div className={styles.fill}>
				<Spinner />
			</div>
		);
	}

	return <Spinner />;

	//
}
