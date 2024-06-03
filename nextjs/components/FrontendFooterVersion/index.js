'use client';

/* * */

import { Link } from '@/translations/navigation';
import pjson from 'package.json';

/* * */

export default function Component({ className }) {
	return (
		<Link className={className} href="https://www.github.com/carrismetropolitana/website" target="_blank">
			{pjson.version}
		</Link>
	);
}
