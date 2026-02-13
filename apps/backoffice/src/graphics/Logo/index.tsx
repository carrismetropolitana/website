import config from '@/payload-config';
import { Media } from '@/payload-types';
import Image from 'next/image';
import { getPayload } from 'payload';
import React from 'react';

export async function Logos() {
	//

	//
	// A. Setup variables

	const payload = await getPayload({ config });
	const settings = await payload.findGlobal({ slug: 'settings' });
	const lightModeLogo = settings?.lightModeLogo as Media;
	const darkModeLogo = settings?.darkModeLogo as Media;

	//
	// B. Render Components

	return (
		<>
			{lightModeLogo?.url ? (
				<Image
					alt={lightModeLogo.alt ?? 'Logo CM Light Mode'}
					className="light-mode-image"
					height={lightModeLogo.height ?? 120}
					src={lightModeLogo.url}
					width={lightModeLogo.width ?? 120}
				/>
			) : null}
			{darkModeLogo?.url ? (
				<Image
					alt={darkModeLogo.alt ?? 'Logo CM Dark Mode'}
					className="dark-mode-image"
					height={darkModeLogo.height ?? 120}
					src={darkModeLogo.url}
					width={darkModeLogo.width ?? 120}
				/>
			) : null}
		</>
	);

	//
}
