/* * */

import FeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import { Grid } from '@/components/layout/Grid';
import { ImagesHome } from '@/settings/assets.settings';

/* * */

export default function Component() {
	return (
		<Grid columns="abc" withGap>
			<FeaturedSectionCard coverImageSrc={ImagesHome.DRIVERS} href="#" title="1" />
			<FeaturedSectionCard coverImageSrc={ImagesHome.CASO_DE_ESTUDO_LOURES} href="#" title="2" />
			<FeaturedSectionCard coverImageSrc="#" href="#" title="3" />
		</Grid>
	);
}
