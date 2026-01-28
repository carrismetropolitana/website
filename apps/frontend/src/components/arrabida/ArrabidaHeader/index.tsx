'use client';

/* * */

import { Logo } from '@/components/header/Logo';
import { useStickyObserver } from '@/hooks/useStickyObserver';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import styles from './styles.module.css';

import { HeaderNavigationDrawer } from '../../header/NavigationDrawer';
import { ArrabidaIcon } from './ArrabidaIcon';
import { ArrabidaLogo } from './ArrabidaLogo';

/* * */

export function ArrabidaHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaHeader');

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
				<div className={styles.logoWrapper}>
					<ArrabidaIcon />
					<ArrabidaLogo />
				</div>
				<div className={styles.contentWrapper}>
					<ul className={styles.navList}>
						<li>
							<a href="#arrabida365">{t('navigation.arrabida365')}</a>
						</li>
						<li>
							<a href="#how-to-get">{t('navigation.how_to_get')}</a>
						</li>
						<li>
							<a href="#lines">{t('navigation.lines')}</a>
						</li>
						<li>
							<a href="#about">{t('navigation.about')}</a>
						</li>
					</ul>
					<HeaderNavigationDrawer />
				</div>
			</div>
		</header>
	);

	//
}
