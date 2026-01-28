'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

interface AutoScrollContainerProps {
	children: ReactNode
	enabled: boolean
	pauseDuration?: number
	scale?: number
	speed?: number
}

export function AutoScrollContainer({
	children,
	enabled = false,
	pauseDuration = 2000,
	scale = 1.0,
	speed = 50,
}: AutoScrollContainerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [scrollDirection, setScrollDirection] = useState<-1 | 1>(1); // 1 = down, -1 = up

	useEffect(() => {
		if (!enabled || !containerRef.current) return;

		const container = containerRef.current;
		let intervalId: NodeJS.Timeout | null = null;

		const scroll = () => {
			if (isPaused || !container) return;

			const { clientHeight, scrollHeight, scrollTop } = container;
			const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1;
			const isAtTop = scrollTop <= 1;

			if (isAtBottom && scrollDirection === 1) {
				// Reached bottom, pause and reverse
				setIsPaused(true);
				setTimeout(() => {
					setScrollDirection(-1);
					setIsPaused(false);
				}, pauseDuration);
			}
			else if (isAtTop && scrollDirection === -1) {
				// Reached top, pause and reverse
				setIsPaused(true);
				setTimeout(() => {
					setScrollDirection(1);
					setIsPaused(false);
				}, pauseDuration);
			}
			else {
				// Continue scrolling
				container.scrollBy({ behavior: 'auto', top: scrollDirection });
			}
		};

		intervalId = setInterval(scroll, speed);

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [enabled, speed, pauseDuration, isPaused, scrollDirection]);

	// Check if content needs scrolling
	useEffect(() => {
		if (!containerRef.current || !contentRef.current) return;

		const container = containerRef.current;
		const content = contentRef.current;

		const needsScroll = content.scrollHeight > container.clientHeight;

		// If content doesn't need scroll, ensure we're at the top
		if (!needsScroll && !enabled) {
			container.scrollTop = 0;
		}
	}, [enabled, children]);

	return (
		<div ref={containerRef} className={styles.container}>
			<div
				ref={contentRef}
				className={styles.content}
				style={{
					transform: `scale(${scale})`,
					transformOrigin: 'top left',
					width: `${100 / scale}%`,
				}}
			>
				{children}
			</div>
		</div>
	);
}
