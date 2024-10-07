'use client';

/* * */

import Logo from '@/components/header/Logo';
import HeaderNavigationDrawer from '@/components/header/NavigationDrawer';
import HeaderNavigationMain from '@/components/header/NavigationMain';
import { useStickyObserver } from '@/hooks/useStickyObserver';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const { isSticky, ref: stickyElementRef } = useStickyObserver({ top: '0px' }, [1], { top: -1 });

	//
	// B. Transform data

	useEffect(() => {
		setInterval(() => {
			const container = document.querySelector(`.${styles.container}`);
			const documentRoot: HTMLElement | null = document.querySelector(':root');
			if (container && documentRoot) {
				documentRoot.style.setProperty('--size-height-header', `${container.clientHeight}px`);
			}
		}, 50);
	});

	//
	// C. Render components

	return (
		<header ref={stickyElementRef} className={`${styles.container} ${isSticky ? styles.isSticky : ''}`}>
			<Logo />
			<div className={styles.navWrapper}>
				<HeaderNavigationMain />
				<HeaderNavigationDrawer />
			</div>
		</header>
	);

	//
}
