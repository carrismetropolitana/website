/* * */

import { Grid } from '@/components/layout/Grid';
import { ProjectsCard } from '@/components/projects/ProjectsCard';
import { useProjectsListContext } from '@/contexts/ProjectsList.context';

/* * */

export function ProjectsList() {
	//

	//
	// A. Setup Variables

	const projectsContext = useProjectsListContext();

	//
	// B. Render Components

	return (
		<Grid
			children={projectsContext.data.raw.map(item => (<ProjectsCard key={`${item._id}-${item.title}`} project={item} />))}
			columns="ab"
			withGap
		/>
	);

	//
}
