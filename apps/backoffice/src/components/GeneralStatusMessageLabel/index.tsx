'use client';
/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export const GeneralStatusMessageLabel = () => {
	//
	// A. Setup variables

	const { data } = useRowLabel<{ is_enabled: boolean, title: string }>();

	//
	// B. Render components

	if (!data) return '---';

	return `${data.is_enabled ? '✅' : '❌'} ${data.title ?? 'Untitled Message'}`.trim();

	//
};
