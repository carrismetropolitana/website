'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import styles from './styles.module.css';

import { BreakpointDesktop } from '../../responsive/BreakpointSwitch';
import { PressHeaderGenericSection } from '../PressHeaderGenericSection';
import { PressNotesContentSection } from '../PressNotesContentSection';

export function PressNotesPage() {
	const t = useTranslations('press.NotesBase');

	return (
		<div className={styles.container}>
			<BreakpointDesktop>
				<PressHeaderGenericSection title={t('section_heading')} />
			</BreakpointDesktop>
			<PressNotesContentSection />
		</div>
	);
}
