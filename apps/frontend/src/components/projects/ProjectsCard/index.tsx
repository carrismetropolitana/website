/* * */

import { Project } from '@/types/projects.type';

/* * */

interface ProjectsCardProps {
	project: Project
}

/* * */

export function ProjectsCard({ project }: ProjectsCardProps) {
	return (
		<div>
			<p>{project.title}</p>
		</div>
	);
}
