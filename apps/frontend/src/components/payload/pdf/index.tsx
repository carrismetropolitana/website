/* * */

import dynamic from 'next/dynamic';

/* * */

const Viewer = dynamic(() => import('./viewer').then(mod => mod.Viewer), { ssr: false });

/* * */

export function Pdf({ url }: { url: string }) {
	return <Viewer url={url} />;
}
