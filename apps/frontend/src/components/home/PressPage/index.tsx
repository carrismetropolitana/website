import React from 'react';

import { PressContact } from '../PressContact';
import { PressFaqSection } from '../PressFaqSection';
import { PressHeaderGenericSection } from '../PressHeaderGenericSection';

import { PressLabelSection } from '../PressLabelSection';

import styles from './styles.module.css';
import { useTranslations } from 'next-intl';
import { PressKnowledgeBase } from '../PressKnowledgeBase/Index';
import { PressNotesBase } from '../PressNotesBase/Index';

export function PressPage() {
	const t = useTranslations('home.PressHeaderSection');
	return (
		<div className={styles.container}>
			<PressHeaderGenericSection title={t('section_heading')} />
			<PressLabelSection />
			<PressKnowledgeBase />
			<PressNotesBase />
			<PressFaqSection />
			<PressContact />
		</div>
	);
}
