'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
import { useDebugContext } from '@/contexts/Debug.context';
import { useRef } from 'react';

import styles from './styles.module.css';

/* * */

export function Logo() {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();

	const clickCountRef = useRef(0);
	const clickTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

	//
	// B. Handle actions

	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// Increment click count
		clickCountRef.current += 1;
		// Clear previous timeout if it exists
		if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
		// If click count reaches 3, toggle debug mode
		if (clickCountRef.current === 3) {
			event.stopPropagation();
			if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
			clickCountRef.current = 0;
			debugContext.actions.toggleDebugMode();
			return;
		}
		// Set timeout to reset click count after 400ms
		// and navigate to home page if it was a single click
		clickTimeoutRef.current = setTimeout(() => {
			if (clickCountRef.current === 1) {
				window.location.href = '/';
			}
			clickCountRef.current = 0;
		}, 400);
	};

	//
	// C. Render components

	return (
		<div aria-label="Carris Metropolitana" className={styles.container} onClick={handleClick}>
			<ThemeSwitch
				dark={<LottiePlayer path="/assets/header/zume/zume-dark.json" style={{ height: 70, width: 150 }} loop play />}
				light={<LottiePlayer path="/assets/header/zume/zume-light.json" style={{ height: 70, width: 150 }} loop play />}
			/>
		</div>
	);
}

/* * */

// export function Logo() {
// 	return (
// 		<Link className={styles.container} href="/">
// 			<ThemeSwitch
// 				dark={<Image alt="Carris Metropolitana" src="/assets/header/static/cmet-header-dark.svg" style={{ height: 70, width: 150 }} />}
// 				light={<Image alt="Carris Metropolitana" src="/assets/header/static/cmet-header-light.svg" style={{ height: 70, width: 150 }} />}
// 			/>
// 		</Link>
// 	);
// }
