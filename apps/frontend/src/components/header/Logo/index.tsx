'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
// import { Image } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function Logo() {
	return (
		<Link aria-label="Carris Metropolitana" className={styles.container} href="/">
			<ThemeSwitch
				dark={<LottiePlayer path="/assets/header/zume/zume-dark.json" style={{ height: 70, width: 150 }} loop play />}
				light={<LottiePlayer path="/assets/header/zume/zume-light.json" style={{ height: 70, width: 150 }} loop play />}
			/>
		</Link>
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
