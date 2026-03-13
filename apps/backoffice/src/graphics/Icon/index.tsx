import config from '@/payload-config';
import { Media } from '@/payload-types';
import { normalizeMediaSrc } from '@/utils/normalize-media-src';
import Image from 'next/image';
import { getPayload } from 'payload';
import React from 'react';

export async function Icons() {
	//
	// A. Setup variables
	//
	const payload = await getPayload({ config });
	const settings = await payload.findGlobal({ slug: 'settings' });

	const lightModeIcon = settings?.lightModeIcon as Media | null;
	const darkModeIcon = settings?.darkModeIcon as Media | null;

	//
	// B. Render Components
	//
	return (
		<>
			{lightModeIcon?.url && (
				<Image
					alt={lightModeIcon.alt ?? 'Icon CM Light Mode'}
					className="light-mode-image"
					height={lightModeIcon.height}
					src={normalizeMediaSrc(lightModeIcon.url)}
					width={lightModeIcon.width}
				/>
			)}

			{darkModeIcon?.url && (
				<Image
					alt={darkModeIcon.alt ?? 'Icon CM Dark Mode'}
					className="dark-mode-image"
					height={darkModeIcon.height}
					src={normalizeMediaSrc(darkModeIcon.url)}
					width={darkModeIcon.width}
				/>
			)}
		</>
	);
}
