'use client';

import { Section } from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

import { Review2025GroupAML } from '../Review2025GroupAML';
import { Review2025GroupArea } from '../Review2025GroupArea';
import { Review2025GroupMunicipality } from '../Review2025GroupMunicipality';
import { Review2025GroupTerminal } from '../Review2025GroupTerminal';
import { Review2025Intro } from '../Review2025Intro';

/* * */

/* * */

export function Review2025Page() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2025.Review2025Page');

	//
	// B. Render components

	return (
		<>
			<Review2025Intro />

			<Section heading={t('heading')} withGap>
				<Review2025GroupAML />
				<Review2025GroupArea />
				<Review2025GroupMunicipality />
				<Review2025GroupTerminal />
			</Section>
		</>
	);

	//
}
