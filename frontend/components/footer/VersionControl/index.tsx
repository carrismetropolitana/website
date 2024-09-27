'use client';

/* * */

import { Link } from '@/i18n/routing';
import { RoutesSocial } from '@/utils/routes';
import pjson from 'package.json';

/* * */

export default function Component({ className }) {
	return (
		<Link className={className} href={`${RoutesSocial.GITHUB}/website`} target="_blank">
			{pjson.version}
		</Link>
	);
}
