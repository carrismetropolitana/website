/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopDisplay } from '@/components/stops/StopDisplay';

/* * */

export function StopsListViewSkeleton() {
	return (
		<Surface>
			<Section>
				{[200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
					<RegularListItem key={index} href="#">
						<StopDisplay width={width} />
					</RegularListItem>
				))}
			</Section>
		</Surface>
	);
}
