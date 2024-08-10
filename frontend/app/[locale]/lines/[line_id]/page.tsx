/* * */

import LinesSingle from '@/components/lines/Single';
import { LinesListContextProvider } from '@/contexts/LinesList.context.js';
import { LinesSingleContextProvider } from '@/contexts/LinesSingle.context.jsx';

/* * */

export default function Page({ params: { line_id } }) {
	return (
		<LinesListContextProvider>
			<LinesSingleContextProvider>
				<LinesSingle lineId={line_id} />
			</LinesSingleContextProvider>
		</LinesListContextProvider>
	);
}
