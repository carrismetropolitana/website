'use client';

/* * */

import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const formatHours = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		return `${hours}`;
	};

	const formatMinutes = (date: Date) => {
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `:${minutes}`;
	};

	const formatSeconds = (date: Date) => {
		const seconds = date.getSeconds().toString().padStart(2, '0');
		return `:${seconds}`;
	};

	return (
		<div className={styles.container}>
			<p className={styles.hours}>{formatHours(time)}</p>
			<p className={styles.minutes}>{formatMinutes(time)}</p>
			<p className={styles.seconds}>{formatSeconds(time)}</p>
		</div>
	);
}
