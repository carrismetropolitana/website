'use client';

import { Section } from '@/components/layout/Section';

import { Review2025AMLGroup } from '../Review2025AMLGroup';
import { Review2025AreaGroup } from '../Review2025AreaGroup';
import { Review2025Intro } from '../Review2025Intro';
import { Review2025MunicipalityGroup } from '../Review2025MunicipalityGroup';
import { Review2025TerminalGroup } from '../Review2025TerminalGroup';

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
				<Review2025AMLGroup />
				<Review2025AreaGroup />
				<Review2025MunicipalityGroup />
				<Review2025TerminalGroup />
			</Section>
		</>
	);

	//
}
