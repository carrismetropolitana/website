'use client';

import { Section } from '@/components/layout/Section';
import { allCardsData } from '@/components/review-2025/_data/cards';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

/* * */

export function Review2025Page() {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<>
			<Section heading="Retroespectiva 2025">
				{allCardsData.map((cardData, index) => (
					<Review2025Card
						key={index}
						cardData={cardData}
					/>
				))}
			</Section>
		</>
	);

	//
}
