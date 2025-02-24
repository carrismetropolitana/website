'use client';

/* * */

import Carousel from '@/components/common/Carousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PlannerCard } from '@/components/planner/PlannerCard';
import { PlannerCardSkeleton } from '@/components/planner/PlannerCardSkeleton';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { shuffleArray } from '@/utils/shuffle';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.css';

/* * */

const partnerApps = shuffleArray([
	{
		description: {
			// en: 'Citymapper is a multimodal transport app that offers detailed and updated public transport routes in real time',
			// pt: 'Citymapper é uma aplicação de transporte multimodal que oferece rotas de transporte público detalhadas e atualizadas em tempo real',
		},
		image_url: '/assets/planner/citymapper.png',
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		description: {
			// en: 'Google Maps offers detailed and updated public transport routes in real time for a stress-free travel experience',
			// pt: 'O Google Maps oferece rotas de transporte público detalhadas e atualizadas em tempo real para uma experiência de viagem sem preocupações',
		},
		image_url: '/assets/planner/google-maps.png',
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		description: {
			// en: 'Moovit provides comprehensive and updated information on schedules, routes, and service alerts, ensuring a smooth and efficient trip.',
			// pt: 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		},
		image_url: '/assets/planner/moovit.png',
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
	{
		description: {
			// en: 'Transit is the latest app in AML.',
			// pt: 'Transit é a mais recente aplicação na AML.',
		},
		image_url: '/assets/planner/transit.png',
		title: 'Transit',
		url: 'https://transit.app',
	},
	{
		description: {
			// en: 'Apple Maps provides real time and estimated information on schedules and routes.',
			// pt: 'Apple Maps disponibliza informação planeada e em tempo real da Carris Metropolitana.',
		},
		image_url: 'assets/planner/apple maps.png',
		title: 'Apple Maps',
		url: 'https://www.apple.com/maps/',
	},
]);

/* * */

export function PlannerPartners() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner.PlannerPartners');
	const locale = useLocale();
	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	const carouselSlides = partnerApps.map(slideItem => ({
		_id: slideItem.title,
		component: (
			<PlannerCard
				description={slideItem.description[locale]}
				imageUrl={slideItem.image_url}
				title={slideItem.title}
				url={slideItem.url}
			/>
		),
	}));
	//
	// C. Handle Actions
	const handleGithubRedirect = () => {
		analyticsContext.actions.capture(ampli => ampli.githubClicked({ click: 'true' }));
	};
	//
	// D. Render Components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')}>
				<Carousel skeletonComponent={<PlannerCardSkeleton />} skeletonQty={4} slides={carouselSlides} slideSize={300} />
				<Link className={styles.disclaimer} href="https://github.com/carrismetropolitana/website/blob/production/frontend/components/planner/PlannerPartners/index.tsx" onClick={handleGithubRedirect} target="_blank">
					{t('disclaimer')}
				</Link>
			</Section>
		</Surface>
	);

	//
}
