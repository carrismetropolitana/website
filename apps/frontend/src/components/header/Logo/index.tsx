'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
// import { Image } from '@mantine/core';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function Logo() {
	const [showMessage, setShowMessage] = useState(false);
	const clickCountRef = useRef(0);
	const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClick = (e: React.MouseEvent) => {
		clickCountRef.current += 1;

		// Clear existing timeout
		if (clickTimeoutRef.current) {
			clearTimeout(clickTimeoutRef.current);
		}

		// If 3 clicks within 500ms, trigger confetti
		if (clickCountRef.current >= 3) {
			e.preventDefault();
			e.stopPropagation();
			clickCountRef.current = 0;

			// Trigger confetti
			confetti({
				origin: { y: 0.6 },
				particleCount: 100,
				spread: 70,
			});

			// More confetti bursts
			setTimeout(() => {
				confetti({
					angle: 60,
					origin: { x: 0 },
					particleCount: 50,
					spread: 55,
				});
			}, 250);
			setTimeout(() => {
				confetti({
					angle: 120,
					origin: { x: 1 },
					particleCount: 50,
					spread: 55,
				});
			}, 400);

			// Show message
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
			}, 4000);
		}
		else {
			// Reset counter after 500ms
			clickTimeoutRef.current = setTimeout(() => {
				clickCountRef.current = 0;
			}, 500);
		}
	};

	useEffect(() => {
		return () => {
			if (clickTimeoutRef.current) {
				clearTimeout(clickTimeoutRef.current);
			}
		};
	}, []);

	return (
		<>
			<Link aria-label="Carris Metropolitana" className={styles.container} href="/" onClick={handleClick}>
				<ThemeSwitch
					dark={<LottiePlayer path="/assets/header/zume/zume-dark.json" style={{ height: 70, width: 150 }} loop play />}
					light={<LottiePlayer path="/assets/header/zume/zume-light.json" style={{ height: 70, width: 150 }} loop play />}
				/>
			</Link>
			{showMessage && (
				<div className={styles.messageOverlay}>
					<div className={styles.messageText}>
						Um enorme obrigada da Carris Metropolitana à Mariana Costa, com todo o nosso carinho ❤️
					</div>
				</div>
			)}
		</>
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
