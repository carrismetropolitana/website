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
	const rawUrl = file?.url;
	const url = rawUrl?.includes('/api/media') && !rawUrl?.includes('/admin/api/media')
		? rawUrl.replace('/api/media', '/admin/api/media')
		: rawUrl;
	const label = file?.filename ?? '';
	const mimeType = file?.mimeType ?? '';

	console.log('rawUrl', rawUrl);
	console.log('url', url);

	//
	// B. Render components

	if (!url) return <p key={key}>Ficheiro inválido</p>;

	// Is an image render as an image
	if (mimeType.startsWith('image/') && url) return <ImageComponent key={key} alt={file?.alt ?? file?.filename} src={url} />;

	// Is a pdf file render as a pdf viewer
	if (mimeType === 'application/pdf' && url) return <Pdf key={key} url={url} />;

	// Render as a download link
	return (
		<a key={key} href={url} rel="noopener noreferrer" target="_blank">
			{label}
		</a>
	);

	//
}
