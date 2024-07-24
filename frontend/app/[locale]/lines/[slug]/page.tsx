/* * */
import LinePage from '@/components/lines/Page/[slug]';
import { Line } from '@/utils/types';

/* * */

export default async function Page({ params }: {
	params: {
		locale: string
		slug: string
	}

}) {
	const lineInfo: Line = await fetch('https://api.carrismetropolitana.pt/lines/' + params.slug).then(res => res.json());
	return (
		<LinePage lineInfo={lineInfo} />
	);
}
