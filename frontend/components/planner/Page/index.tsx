'use client';

/* * */

import FeaturedAppCard from '@/components/common/FeaturedAppCard';
import LayoutSection from '@/components/layout/Section';
import { shuffleArray } from '@/utils/shuffle';
import { Carousel } from '@mantine/carousel';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const partnerApps = [
	{
		description: 'O Google Maps oferece rotas de transporte público detalhadas e atualizadas em tempo real para uma experiência de viagem sem preocupações',
		imageUrl: '/images/partners/google-maps.png',
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		description: 'Citymapper é uma aplicação de transporte multimodal que oferece rotas de transporte público detalhadas e atualizadas em tempo real',
		imageUrl: '/images/partners/citymapper.png',
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		description: 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		imageUrl: '/images/partners/moovit.jpg',
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('planner');

	//
	// B. Transform data

	const randomizedPartnerApps = shuffleArray(partnerApps);

	//
	// C. Render Components

	return (
		<LayoutSection heading={t('our_partners')} subheading={t('our_partners_description')} withTopBorder={false}>
			<Carousel align="start" height={320} slideSize="100" withControls={false}>
				{randomizedPartnerApps.map(partnerApp => (
					<Carousel.Slide key={partnerApp.title}>
						<div className={styles.carouselItem}>
							<FeaturedAppCard description={partnerApp.description} imageUrl={partnerApp.imageUrl} title={partnerApp.title} url={partnerApp.url} />
						</div>
					</Carousel.Slide>
				))}
			</Carousel>
			<div className={styles.disclaimer}>
				{t('github_disclaimer')}
			</div>
		</LayoutSection>
	);

	//
}
