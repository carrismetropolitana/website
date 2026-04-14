'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { useTranslations } from 'next-intl';

/* * */

export function ProjectsPage() {
	//

	//
	// A. Setup variables

	const t = useTranslations('projects.ProjectsPage');

	//
	// B. Render components

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} />
			</Surface>
			<Section>
				<ProjectsList />
			</Section>
		</>
	);

	//
}
