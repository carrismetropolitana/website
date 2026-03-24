'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

/* * */

export function TapAndRide() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<Surface>
			<Section>
				<div>
					<h1>{t('title')}</h1>
				</div>
			</Section>
		</Surface>
	);

	//
}
