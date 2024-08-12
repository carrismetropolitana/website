/* * */

import LinesSingle from '@/components/lines/Single';
import { LinesListContextProvider } from '@/contexts/LinesList.context';
import { LinesSingleContextProvider } from '@/contexts/LinesSingle.context';

/* * */

export default function Page({ params: { line_id } }) {
	return (
		<LinesListContextProvider>
			<LinesSingleContextProvider lineId={line_id}>
				<LinesSingle />
			</LinesSingleContextProvider>
		</LinesListContextProvider>
	);
}
