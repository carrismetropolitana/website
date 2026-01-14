/* * */

import { Grid } from '@/components/layout/Grid';
import { Surface } from '@/components/layout/Surface';
import { municipalityData } from '@/components/review-2025/_data/cards';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025MunicipalityGroup() {
	//
	return (
		<Surface forceOverflow>
			<Grid columns="abb">
				{municipalityData.map((data, index) => <Review2025Card key={index} data={data} />)}
			</Grid>
		</Surface>
	);
	//
}
