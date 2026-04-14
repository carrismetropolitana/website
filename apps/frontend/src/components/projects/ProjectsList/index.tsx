/* * */

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
		projectsContext.data.raw.map(item => (
			<>
				{item.title}
			</>
		),
		)
	);

	//
}
