'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allPassangersCardsData } from '@/components/survey/_data/Passenger/cards';
import { SurveyPasgrCharacterCard } from '@/components/survey/SurveyPasgrCharacterCard';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveyLevelPasgrCharacter() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey.SurveyPsgrCharacterCard');
	const allPassengersCardData = allPassangersCardsData;

	//
	// B. Render components

	return (
		<div id="passangerChacterization">
			<Surface forceOverflow>
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<div className={styles.contentWrapper}>
						{allPassengersCardData.map((cardData, index) => (
							<SurveyPasgrCharacterCard key={index} cardData={cardData} />
						))}
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
