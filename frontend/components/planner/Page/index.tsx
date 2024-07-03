'use client';
/* * */

import FeaturedAppCard from '@/components/common/FeaturedAppCard';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const partners = [
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
		url: 'https://citymapper.com/',
	},
	{
		description: 'A Moovit oferece informações abrangentes e atualizadas sobre horários, rotas e alertas de serviço, garantindo uma viagem tranquila e eficiente.',
		imageUrl: '/images/partners/moovit.jpg',
		title: 'Moovit',
		url: 'https://moovit.com/',
	},
];
shuffle(partners);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffle(array: any[]) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
}

export default function Component() {
	const t = useTranslations('planner');
	return (
		<div>
			<header className={styles.header}>
				<h1>{t('our_partners')}</h1>
				<p>{t('our_partners_description')}</p>
			</header>
			<Carousel align="start" height={320} slideSize="100" withControls={false}>
				{partners.map(partner => (
					<Carousel.Slide key={partner.title}>
						<div className={styles.carouselItem}>
							<FeaturedAppCard description={partner.description} imageUrl={partner.imageUrl} title={partner.title} url={partner.url} />
						</div>
					</Carousel.Slide>
				))}
			</Carousel>
			<div className={styles.footer}>
				{t('github_disclaimer')}
			</div>
		</div>
	);
}
