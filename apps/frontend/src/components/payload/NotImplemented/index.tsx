'use client';

/* * */

import type { ReactNode } from 'react';

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

/* * */

interface Props {
	blockSlug?: string
	fields?: unknown
	nodeType?: string
}

export function NotImplemented({ blockSlug, nodeType }: Props): ReactNode {
	//

	//
	// A. Render Components

	if (!blockSlug) return null;

	return (
		<Surface data-block-slug={blockSlug}>
			<Section>
				<p>Work in progress, this block is not implemented yet: <span style={{ fontWeight: 600 }}>{blockSlug}</span></p>
				{nodeType ? <p>Type: {nodeType}</p> : null}
			</Section>
		</Surface>
	);

	//
}
