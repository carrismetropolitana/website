/* * */

import LinesDetail from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { LinesListContextProvider } from '@/contexts/LinesList.context';

/* * */

export default function Page({ params: { line_id } }) {
	return (
		<LinesListContextProvider>
			<LinesDetailContextProvider lineId={line_id}>
				<LinesDetail />
			</LinesDetailContextProvider>
		</LinesListContextProvider>
	);
}
