'use client';

/* * */

import LayoutSection from '@/components/layout/Section';
import PlannerCard from '@/components/planner/Card';
import { Link } from '@/translations/navigation';
import { shuffleArray } from '@/utils/shuffle';
import { Carousel } from '@mantine/carousel';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const partnerApps = shuffleArray([
	{
		description: 'Citymapper é uma aplicação de transporte multimodal que oferece rotas de transporte público detalhadas e atualizadas em tempo real',
		imageUrl: '/planner/citymapper.png',
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		description: 'O Google Maps oferece rotas de transporte público detalhadas e atualizadas em tempo real para uma experiência de viagem sem preocupações',
		imageUrl: '/planner/google-maps.png',
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		description: 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		imageUrl: '/planner/moovit.jpg',
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
	{
		description: 'A Transit é a mais recente aplicação na amL.',
		imageUrl: '/planner/transit.jpg',
		title: 'Transit',
		url: 'https://transit.app',
	},
]);

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner');

	//
	// B. Render Components

	return (
		<LayoutSection heading={t('our_partners')} subheading={t('our_partners_description')} withTopBorder={false}>
			<Carousel align="start" height={320} slideSize="300" withControls={false}>
				{partnerApps.map(partnerApp => (
					<Carousel.Slide key={partnerApp.title}>
						<div className={styles.carouselItem}>
							<PlannerCard description={partnerApp.description} imageUrl={partnerApp.imageUrl} title={partnerApp.title} url={partnerApp.url} />
						</div>
					</Carousel.Slide>
				))}
			</Carousel>
			<Link className={styles.disclaimer} href="https://github.com/carrismetropolitana/website/blob/alpha/frontend/components/planner/Page/index.tsx" target="_blank">
				{t('github_disclaimer')}
			</Link>
		</LayoutSection>
	);

	//
}
