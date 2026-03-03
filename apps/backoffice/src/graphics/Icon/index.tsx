import config from '@/payload-config';
import { Media } from '@/payload-types';
import Image from 'next/image';
import { getPayload } from 'payload';
import React from 'react';

export async function Icons() {
	//

	//
	// A. Setup variables

	const payload = await getPayload({ config });
	const settings = await payload.findGlobal({ slug: 'settings' });
	const lightModeIcon = settings?.lightModeIcon as Media;
	const darkModeIcon = settings?.darkModeIcon as Media;

	//
	// B. Render Components

	return (
		<>
			<Image alt={lightModeIcon?.alt ?? 'Icon CM Light Mode'} className="light-mode-image" height={lightModeIcon?.height} src={lightModeIcon?.url} width={lightModeIcon?.width} />
			<Image alt={darkModeIcon?.alt ?? 'Icon CM Dark Mode'} className="dark-mode-image" height={darkModeIcon?.height} src={darkModeIcon?.url} width={darkModeIcon?.width} />

		</>
	);

	//
}
