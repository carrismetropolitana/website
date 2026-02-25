'use client';
/* * */

import { useTranslations } from 'next-intl';

/* * */

interface PipsSurveyPageProps {
	pipId: string
}

/* * */

export function PipsSurveyPage({ pipId }: PipsSurveyPageProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2025.Review2025Page');

	//
	// B. Render components

	return (
		<>
			<p>Pips Survey Page with id {pipId} </p>
		</>
	);

	//
}
