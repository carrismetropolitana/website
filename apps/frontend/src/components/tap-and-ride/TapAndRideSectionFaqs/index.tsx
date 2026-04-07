'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { useTranslations } from 'next-intl';

import { tapAndRideDataSectionFaqs } from '../_data/data';

/* * */

export function TapAndRideSectionFaqs() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<Section heading={t('SectionFaqs.heading')}>
			<TapAndRideAccordion
				withBorder={true}
				withOuterPadding={false}
				items={tapAndRideDataSectionFaqs?.map(item => ({
					id: item.id,
					panel: (<> {t(item.content)} </>),
					title: t(item.title),
				}))}
			/>
		</Section>
	);
}
