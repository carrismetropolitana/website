'use client';

/* * */

import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export function AppViewport({ children }) {
	//

	//
	// A. Render actions

	useEffect(() => {
		// Prevent zooming on mobile devices
		if (typeof window === 'undefined') return;
		const meta = document.createElement('meta');
		meta.setAttribute('name', 'viewport');
		meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
		document.getElementsByTagName('head')[0].appendChild(meta);
	}, []);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{children}
		</div>
	);

	//
}
