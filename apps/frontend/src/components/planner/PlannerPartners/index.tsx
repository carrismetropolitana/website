'use client';

/* * */

import Carousel from '@/components/common/Carousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PlannerCard } from '@/components/planner/PlannerCard';
import { PlannerCardSkeleton } from '@/components/planner/PlannerCardSkeleton';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { shuffleArray } from '@/utils/shuffle';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ParnerApp {
	image_url: string
	title: string
	url: string
}

/* * */

const partnerApps: ParnerApp[] = [
	{
		image_url: '/assets/planner/moovit.png',
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
	{
		image_url: '/assets/planner/citymapper.png',
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		image_url: '/assets/planner/google-maps.png',
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		image_url: '/assets/planner/transit.png',
		title: 'Transit',
		url: 'https://transit.app',
	},
	{
		image_url: '/assets/planner/apple-maps.png',
		title: 'Apple Maps',
		url: 'https://www.apple.com/maps',
	},
	{
		image_url: '/assets/planner/movize.png',
		title: 'Movize',
		url: 'https://movize.pt',
	},
];

/* * */

export function PlannerPartners() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner.PlannerPartners');

	const analyticsContext = useAnalyticsContext();

	const [shuffledApps, setShuffledApps] = useState<ParnerApp[]>([]);

	//
	// B. Transform data

	useEffect(() => {
		// Only shuffle on the client side after initial render
		setShuffledApps(shuffleArray([...partnerApps]));
	}, []);

	const carouselSlides = shuffledApps.map(slideItem => ({
		_id: slideItem.title,
		component: (
			<PlannerCard
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
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')}>
				<Carousel
					skeletonComponent={<PlannerCardSkeleton />}
					skeletonQty={4}
					slides={carouselSlides}
					slideSize={300}
				/>
				<Link
					className={styles.disclaimer}
					href="https://github.com/carrismetropolitana/website/blob/production/apps/frontend/src/components/planner/PlannerPartners/index.tsx"
					onClick={handleGithubRedirect}
					target="_blank"
				>
					{t('disclaimer')}
				</Link>
			</Section>
		</Surface>
	);

	//
}
