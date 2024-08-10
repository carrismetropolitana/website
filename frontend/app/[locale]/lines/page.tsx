/* * */

import LinesPage from '@/components/lines/Page';
import { LinesListContextProvider } from '@/contexts/LinesList.context';

/* * */

export default function Page() {
	return (
		<LinesListContextProvider>
			<LinesPage />
		</LinesListContextProvider>
	);
}
