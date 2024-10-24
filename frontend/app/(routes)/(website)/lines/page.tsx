/* * */

import { LinesList } from '@/components/lines/LinesList';
import { LinesListContextProvider } from '@/contexts/LinesList.context';

/* * */

export default function Page() {
	return (
		<LinesListContextProvider>
			<LinesList />
		</LinesListContextProvider>
	);
}
