/* * */

import { ProjectsCarousel } from '@/components/home/ProjectsCarousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

/* * */

export function ProjectsSection() {
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
