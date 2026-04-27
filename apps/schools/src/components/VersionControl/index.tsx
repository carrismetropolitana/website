'use client';

/* * */

import pjson from '#/package.json';

import styles from './styles.module.css';

/* * */

export function VersionControl() {
	return (
		<p className={styles.version}>{pjson.version}</p>
	);
}
