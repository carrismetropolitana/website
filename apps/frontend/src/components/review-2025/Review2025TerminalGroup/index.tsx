/* * */

import { Grid } from '@/components/layout/Grid';
import { Surface } from '@/components/layout/Surface';
import { terminalsData } from '@/components/review-2025/_data/cards';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025TerminalGroup() {
	//
	return (
		<Surface forceOverflow>
			<Grid columns="abb">
				{terminalsData.map((data, index) => <Review2025Card key={index} data={data} />)}
			</Grid>
		</Surface>
	);
	//
}
