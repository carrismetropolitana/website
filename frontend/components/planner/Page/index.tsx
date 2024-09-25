/* * */

import Carousel from '@/components/common/Carousel';
import Section from '@/components/layout/Section';
import PlannerCard from '@/components/planner/Card';
import PlannerCardSkeleton from '@/components/planner/CardSkeleton';
import { Link } from '@/i18n/routing';
import { ImagesPlanner } from '@/utils/assets';
import { shuffleArray } from '@/utils/shuffle';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const partnerApps = shuffleArray([
	{
		description: 'Citymapper é uma aplicação de transporte multimodal que oferece rotas de transporte público detalhadas e atualizadas em tempo real',
		imageUrl: ImagesPlanner.PLANNER_CITY_MAPPER,
		title: 'Citymapper',
		url: 'https://citymapper.com',
	},
	{
		description: 'O Google Maps oferece rotas de transporte público detalhadas e atualizadas em tempo real para uma experiência de viagem sem preocupações',
		imageUrl: ImagesPlanner.PLANNER_GOOGLE_MAPS,
		title: 'Google Maps',
		url: 'https://www.google.com/maps',
	},
	{
		description: 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		imageUrl: ImagesPlanner.PLANNER_MOOVIT,
		title: 'Moovit',
		url: 'https://moovitapp.com',
	},
	{
		description: 'A Transit é a mais recente aplicação na amL.',
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
