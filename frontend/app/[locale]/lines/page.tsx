/* * */

import LinesPage from '@/components/lines/Page';
import { LinesContextProvider } from '@/contexts/lines.context';

/* * */

export default function Page() {
	return (
		<LinesContextProvider>
			<LinesPage />
		</LinesContextProvider>
	);
}
