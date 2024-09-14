'use client';

/* * */

import { Link } from '@/i18n/routing';
import pjson from 'package.json';

/* * */

export default function Component({ className }) {
	return (
		<Link className={className} href="https://www.github.com/carrismetropolitana/website" target="_blank">
			{pjson.version}
		</Link>
	);
}
