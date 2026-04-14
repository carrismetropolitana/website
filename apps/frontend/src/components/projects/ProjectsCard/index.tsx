/* * */

import type { Project } from '@/types/projects.type';

import { Image } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface ProjectsCardProps {
	project: Project
}

/* * */

export function ProjectsCard({ project }: ProjectsCardProps) {
	//

	//
	// A. Render components

	return (
		<div className={styles.card}>
			<Image
				alt={project.title ?? ''}
				className={styles.image}
				fallbackSrc="/assets/common/placeholder.png"
				radius="var(--border-radius-lg)"
				src={project.featured_image?.thumbnailURL || project.featured_image?.url}
			/>

			<div className={styles.content}>
				<p className={styles.title}>{project.title}</p>
				{project.description && <p className={styles.description}>{project.description}</p>}

				{project.more_info_url && (
					<Link className={styles.learnMore} href={project.more_info_url} target="_blank">
						Learn more
						<IconArrowRight size={16} />
					</Link>
				)}
			</div>
		</div>
	);

	//
}
