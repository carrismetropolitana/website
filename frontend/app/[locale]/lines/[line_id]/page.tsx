/* * */

import LinesSingle from '@/components/lines/Single';
import { LinesContextProvider } from '@/contexts/lines.context';

/* * */

export default function Page({ params: { line_id } }) {
	return (
		<LinesContextProvider>
			<LinesSingle lineId={line_id} />
		</LinesContextProvider>
	);
}
