'use client';
/* * */

import { useField } from '@payloadcms/ui';

import styles from './styles.module.css';

/* * */

export function LinkFieldPreview() {
	//

	//
	// A. Setup variables

	const { value } = useField<string>({ path: 'url' });

	//
	// B. Render components

	if (!value?.trim()) return null;

	let displayUrl = value;
	try {
		const url = new URL(value);
		displayUrl = url.hostname + url.pathname + url.search;
	}
	catch {
		displayUrl = value;
	}

	return (
		<div className={styles.container}>
			<a className={styles.link} href={value} rel="noreferrer noopener" target="_blank">
				<svg
					className={styles.icon}
					fill="none"
					height="14"
					viewBox="0 0 24 24"
					width="14"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
				<span className={styles.text}> {displayUrl} </span>
			</a>
		</div>
	);

	//
}
