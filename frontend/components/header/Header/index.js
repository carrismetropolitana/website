'use client';

/* * */

import HeaderLogo from '@/components/header/Logo';
import HeaderNavigationDrawer from '@/components/header/NavigationDrawer';
import HeaderNavigationMain from '@/components/header/NavigationMain';
import HeaderStatus from '@/components/header/Status';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Transform data

	useEffect(() => {
		setInterval(() => {
			const container = document.querySelector(`.${styles.container}`);
			const documentRoot = document.querySelector(':root');
			if (container && documentRoot) {
				documentRoot.style.setProperty('--size-height-header', `${container.clientHeight}px`);
			}
		}, 50);
	});

	//
	// B. Render components

	return (
		<>
			<div className={styles.spacer} />
			<div className={styles.container}>
				<div className={styles.mainWrapper}>
					<HeaderLogo />
					<div className={styles.navWrapper}>
						<HeaderNavigationMain />
						<HeaderNavigationDrawer />
					</div>
				</div>
				<HeaderStatus />
			</div>
		</>
	);

	//
}
