/* * */

import LinesSingle from '@/components/lines/Single';
import { LinesContextProvider } from '@/contexts/lines.context';

/* * */

export default function Page({ params: { line_id } }) {
	return (
		<LinesContextProvider>
			<LinesSingle line_id={line_id} />
		</LinesContextProvider>
	);
}
