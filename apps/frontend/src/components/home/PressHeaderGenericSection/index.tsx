import { BreakpointDesktop } from '@/components/responsive/BreakpointSwitch';
import React from 'react';

import styles from './styles.module.css';

interface PressHeaderGenericSectionProps {
	title: string
}

export function PressHeaderGenericSection({ title }: PressHeaderGenericSectionProps) {
	return (
		<BreakpointDesktop>
			<section className={styles.pressHeaderSectionWrapper}>
				<h1>{title}</h1>
			</section>
		</BreakpointDesktop>
	);
}
