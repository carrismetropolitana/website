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
			<p className={styles.title}>{project.title}</p>

			<div className={styles.body}>
				<div className={styles.media}>
					<Image
						alt={project.title}
						className={styles.image}
						fallbackSrc="/assets/common/placeholder.png"
						radius="var(--border-radius-lg)"
						src={project.featured_image?.url}
					/>
					<Link className={styles.learnMore} href={project.more_info_url} target="_blank">Learn more<IconArrowRight size={16} /></Link>
				</div>

				<div className={styles.content}>
					<p className={styles.description}>{project.description}</p>
				</div>
			</div>

		</div>
	);

	//
}
