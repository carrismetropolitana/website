'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Text } from '@mantine/core';
import { Dates } from '@tmlmobilidade/dates';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function PipsHeader() {
	//
	// A. Live clock

	const [hours, setHours] = useState('--');
	const [minutes, setMinutes] = useState('--');
	const [seconds, setSeconds] = useState('--');

	//
	// B. Time updater

	useEffect(() => {
		const updateTime = () => {
			const now = Dates.now('Europe/Lisbon');
			setHours(now.toFormat('HH'));
			setMinutes(now.toFormat(':mm'));
			setSeconds(now.toFormat('ss'));
		};
		updateTime();
		const timer = setInterval(updateTime, 1000);
		return () => clearInterval(timer);
	}, []);

	//
	// C. Render

	return (
		<header className={styles.container}>

			{/* Stop ID */}
			<div className={styles.context}>
				<Text className={styles.stop}>ID: 504</Text>
				{/* This must come from PipsConfig */}
			</div>

			{/* Branding */}
			<Link
				aria-label="Carris Metropolitana"
				className={styles.logo}
				href="/"
			>
				<LottiePlayer
					path="pips/assets/header/zume/zume-light.json"
					style={{ height: 100, width: 250 }}
					loop
					play
				/>
			</Link>

			{/* Date */}
			<div className={styles.dateContainer}>
				<div className={styles.timeContainer}>
					<p className={styles.hours}>{hours}</p>
					<p className={styles.minutes}>{minutes}</p>
					<p className={styles.seconds}>{seconds}</p>
				</div>
			</div>
		</header>
	);
}
