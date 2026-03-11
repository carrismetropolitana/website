'useclient';

/* * */

import { ImageComponent } from '@/components/payload/image';
import { Pdf } from '@/components/payload/pdf';
import { LexicalNode } from '@/types/lexical-node.types';
import { ReactNode } from 'react';
/* * */

interface UploadValue {
	alt?: string
	filename?: string
	mimeType?: string
	url?: string
}

/* * */

export function renderUpload(node: LexicalNode, key?: number): ReactNode {
	//

	//
	// A. Setup variables

	const file = node.value as undefined | UploadValue;
	const url = file?.url;
	const label = file?.filename ?? '';
	const mimeType = file?.mimeType ?? '';

	//
	// B. Render components

	if (!url) return <p>Ficheiro inválido</p>;

	// Is an image render as an image
	if (mimeType.startsWith('image/')) return <ImageComponent key={key} alt={file?.alt ?? file?.filename} src={url} />;

	// Is a pdf file render as a pdf viewer
	if (mimeType === 'application/pdf') return <Pdf key={key} url={url} />;

	// Render as a download link
	return (
		<a key={key} href={url} rel="noopener noreferrer" target="_blank">
			{label}
		</a>
	);

	//
}
