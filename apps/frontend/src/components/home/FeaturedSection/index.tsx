/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

import { ProjectsCarousel } from '../ProjectsCarousel';

/* * */

export function FeaturedSection() {
	//

	//
	// A. Render Components

	return (
		<Surface>
			<Section heading="Projetos" href="/projects" withPadding>
				<ProjectsCarousel />
			</Section>
		</Surface>
	);
}
