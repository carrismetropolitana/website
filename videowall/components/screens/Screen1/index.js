/* * */

import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import Screen1PaxSummary from '@/components/screens/Screen1PaxSummary';
import Screen1PutSummary from '@/components/screens/Screen1PutSummary';

/* * */

export default function Screen1() {
	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<Screen1PaxSummary />
				<Screen1PutSummary />
			</Columns>
		</ScreenWrapper>
	);
}
