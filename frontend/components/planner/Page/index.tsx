/* * */

import Carousel from '@/components/common/Carousel';
import Section from '@/components/layout/Section';
import PlannerCard from '@/components/planner/Card';
import PlannerCardSkeleton from '@/components/planner/CardSkeleton';
import { Link } from '@/i18n/routing';
import { shuffleArray } from '@/utils/shuffle';
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

	const t = useTranslations('planner.Page');

	//
	// B. Transform data

	const carouselSlides = partnerApps.map(slideItem => ({
		_id: slideItem.title,
		component: (
			<PlannerCard
				description={slideItem.description}
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
