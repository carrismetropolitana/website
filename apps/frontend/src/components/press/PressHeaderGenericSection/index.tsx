import { BreakpointDesktop } from '@/components/responsive/BreakpointSwitch';
import React from 'react';

import styles from './styles.module.css';

interface PressHeaderGenericSectionProps {
	title: string
}

export function PressHeaderGenericSection({ title }: PressHeaderGenericSectionProps) {
	// Determine title length and apply appropriate class
	const getTitleClass = () => {
		const titleLength = title.length;

		if (titleLength <= 8) {
			return styles.titleShort;
		}
		else if (titleLength <= 16) {
			return styles.titleMedium;
		}
		else {
			return styles.titleLong;
		}
	};

	return (
		<BreakpointDesktop>
			<section className={styles.pressHeaderSectionWrapper}>
				<h1 className={getTitleClass()}>{title}</h1>
			</section>
		</BreakpointDesktop>
	);
}
