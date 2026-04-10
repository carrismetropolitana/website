'use client';
/* * */

import { TapAndRideAccordion } from '@/components/tap-and-ride/TapAndRideAccordion';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';

/* * */

interface TapAndRideKeyedItem {
	id: string
	title: string
}

interface TapAndRideContentSectionProps<TItem extends TapAndRideKeyedItem> {
	imageAlt?: string
	imageSrc?: string
	item: TItem
	renderPanel: (t: ReturnType<typeof useTranslations>, item: TItem) => ReactNode
}

/* * */

export function TapAndRideContentSection<TItem extends TapAndRideKeyedItem>({ imageAlt, imageSrc, item, renderPanel }: TapAndRideContentSectionProps<TItem>) {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render components

	return (
		<TapAndRideAccordion
			imageAlt={imageAlt}
			imageSrc={imageSrc}
			items={[{
				id: item.id,
				panel: renderPanel(t, item),
				title: t(item.title),
			}]}
		/>
	);

	//
}
