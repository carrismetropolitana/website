'use client';

/* * */
import Carousel from '@/components/common/Carousel';
import Section from '@/components/layout/Section';
import PlannerCard from '@/components/planner/Card';
import PlannerCardSkeleton from '@/components/planner/CardSkeleton';
import { Link } from '@/i18n/routing';
import { ImagesPlanner } from '@/settings/assets.settings';
import { shuffleArray } from '@/utils/shuffle';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import styles from './styles.module.css';

/* * */

const partnerApps = shuffleArray([
	{
		description: {
			'en-US': 'Citymapper is a multimodal transport app that offers detailed and updated public transport routes in real time',
			'pt-PT': 'Citymapper é uma aplicação de transporte multimodal que oferece rotas de transporte público detalhadas e atualizadas em tempo real',
		},
		imageUrl: ImagesPlanner.PLANNER_CITY_MAPPER,
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		description: {
			'en-US': 'Google Maps offers detailed and updated public transport routes in real time for a stress-free travel experience',
			'pt-PT': 'O Google Maps oferece rotas de transporte público detalhadas e atualizadas em tempo real para uma experiência de viagem sem preocupações',
		},
		imageUrl: ImagesPlanner.PLANNER_GOOGLE_MAPS,
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		description: {
			'en-US': 'Moovit provides comprehensive and updated information on schedules, routes, and service alerts, ensuring a smooth and efficient trip.',
			'pt-PT': 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		},
		imageUrl: ImagesPlanner.PLANNER_MOOVIT,
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
	{
		description: {
			'en-US': 'Transit is the latest app in AML.',
			'pt-PT': 'Transit é a mais recente aplicação na AML.',
		},
		imageUrl: ImagesPlanner.PLANNER_TRANSIT,
		title: 'Transit',
		url: 'https://transit.app',
	},
]);

/* * */

export default function Component() {
	//

	//
	// A. Setup variables
	const t = useTranslations('planner.Page.Partners');
	const locale = useLocale();
	//
	// B. Transform data

	const carouselSlides = partnerApps.map(slideItem => ({
		_id: slideItem.title,
		component: (
			<PlannerCard
				description={slideItem.description[locale]}
				imageUrl={slideItem.imageUrl}
				title={slideItem.title}
				url={slideItem.url}
			/>
		),
	}));

	//
	// C. Render Components

	return (
		<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false}>
			<Carousel skeletonComponent={<PlannerCardSkeleton />} skeletonQty={4} slides={carouselSlides} slideSize={300} />
			<Link className={styles.disclaimer} href="https://github.com/carrismetropolitana/website/blob/alpha/frontend/components/planner/Page/index.tsx" target="_blank">
				{t('disclaimer')}
			</Link>
		</Section>
	);

	//
}
