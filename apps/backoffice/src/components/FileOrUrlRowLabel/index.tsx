'use client';
/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export function FileOrUrlRowLabel() {
	//

	//
	// A. Setup variables

	const { data } = useRowLabel<{ content_type: string, title: string }>();
	const title = data?.title || 'Documento sem nome';
	const contentType = data?.content_type || ' - ';

	//
	// B. Render components

	return `${title} (${contentType})`;

	//
};
