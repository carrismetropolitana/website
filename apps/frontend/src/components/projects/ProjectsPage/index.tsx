'use client';

import { Grid } from '@/components/layout/Grid';
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
			<Surface>
				<Section withPadding>
					<ProjectsList />
				</Section>
			</Surface>
		</>
	);

	//
}
