'use client';

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
		<div className={styles.container}>
			{allCardsData.map(cardData => (
				<Review2025Card
					key={cardData._id}
					cardData={cardData}
				/>
			))}
		</div>
	);

	//
}
