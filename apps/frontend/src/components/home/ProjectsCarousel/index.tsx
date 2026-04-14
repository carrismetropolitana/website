'use client';

/* * */

import { ProjectsCarouselCard } from '@/components/home/ProjectsCarouselCard';
import { Project } from '@/types/projects.type';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function ProjectsCarousel() {
	//

	//
	// A. Fetch data

	const { data: projectsData } = useSWR<Project[]>(`${getPublicVariable('server_url_backoffice')}/admin/public-api/projects`);

	//
	// C. Render components

	return (
		<Carousel
			classNames={{ control: styles.control, controls: styles.controlsWrapper, root: styles.root, slide: styles.carouselSlide }}
			emblaOptions={{ align: 'start', slidesToScroll: 1 }}
			nextControlIcon={<IconArrowRight size={18} />}
			previousControlIcon={<IconArrowLeft size={18} />}
			slideGap="md"
			slideSize={{ base: '100%', md: '33.333333%' }}
			style={{ flex: 1, maxWidth: '100%' }}
			withControls={projectsData?.length > 0}
			withIndicators
		>

			{projectsData?.map(item => (
				<Carousel.Slide key={item.id ?? item._id} className={styles.slideWrapper}>
					<ProjectsCarouselCard
						coverImageSrc={item.featured_image?.thumbnailURL ?? item.featured_image?.url}
						href={item.more_info_url}
						keywords={item.keywords}
						title={item.title}
					/>
				</Carousel.Slide>
			))}

		</Carousel>
	);

	//
}
