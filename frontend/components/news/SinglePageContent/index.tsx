'use client';

/* * */

import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ newsData }) {
	//

	//
	// A. Transform data

	useEffect(() => {
		// Remove unecessary Wordpress HTML
		document.querySelectorAll('.wp-block-spacer').forEach(el => el.remove());
	});

	//
	// B. Render Components

	return (
		<div className={styles.content} dangerouslySetInnerHTML={{ __html: newsData?.content }} />
	);

	//
}
