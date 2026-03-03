'use client';

/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export const HomeSliderMessageLabel = () => {
	//

	const { data } = useRowLabel<{ is_enabled: boolean, title: string }>();

	if (!data) return '---';

	return `${data.is_enabled ? '✅' : '❌'} ${data.title ?? 'Untitled Slide'}`.trim();

	//
};
