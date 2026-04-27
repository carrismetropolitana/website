'use client';

/* * */

import pjson from '#/package.json';
import { URLS } from '@/settings/urls.settings';
import Link from 'next/link';

/* * */

export function VersionControl({ className }) {
	return (
		<Link className={className} href={URLS.repos.website} target="_blank">
			{pjson.version}
		</Link>
	);
}
