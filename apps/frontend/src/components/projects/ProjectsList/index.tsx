/* * */

import { Grid } from '@/components/layout/Grid';
import { Surface } from '@/components/layout/Surface';
import { useProjectsListContext } from '@/contexts/ProjectsList.context';

import { ProjectsCard } from '../ProjectsCard';

/* * */

export function ProjectsList() {
	//

	//
	// A. Setup Variables

	const projectsContext = useProjectsListContext();

	//
	// B. Render Components

	return (
		<Surface>
			<Grid
				columns="ab"
				children={projectsContext.data.raw.map(item => (
					<ProjectsCard key={`${item._id}-${item.title}`} project={item} />
				))}
				withGap
			/>
		</Surface>
	);

	//
}
