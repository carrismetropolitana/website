'use client';

import { Section } from '@/components/layout/Section';

import { Review2025GroupAML } from '../Review2025GroupAML';
import { Review2025GroupArea } from '../Review2025GroupArea';
import { Review2025Intro } from '../Review2025Intro';
import { Review2025GroupMunicipality } from '../Review2025GroupMunicipality';
import { Review2025GroupTerminal } from '../Review2025GroupTerminal';

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
			<Review2025Intro />

			<Section heading="Retroespectiva 2025" withGap>
				<Review2025GroupAML />
				<Review2025GroupArea />
				<Review2025GroupMunicipality />
				<Review2025GroupTerminal />
			</Section>
		</>
	);

	//
}
