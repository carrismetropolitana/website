import { useTranslations } from 'next-intl';
import React from 'react';

import styles from './styles.module.css';

import { BreakpointDesktop } from '../../responsive/BreakpointSwitch';
import { PressHeaderGenericSection } from '../PressHeaderGenericSection';
import { PressKnowledgeContentSection } from '../PressKnowledgeContentSection';

export function PressKnowledgePage() {
	const t = useTranslations('home.PressKnowledgeBase');

	return (
		<div className={styles.container}>
			<BreakpointDesktop>
				<PressHeaderGenericSection title={t('section_heading')} />
			</BreakpointDesktop>
			<PressKnowledgeContentSection />
		</div>
	);
}
