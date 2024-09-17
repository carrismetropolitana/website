/* * */

import HomeCarousel from '@/components/home/Carousel';
import FeaturedSection from '@/components/home/FeaturedSection';
import MetricsSection from '@/components/home/MetricsSection';
import NewsSection from '@/components/home/NewsSection';
import QuickSearch from '@/components/home/QuickSearch';
import SchedulesSection from '@/components/home/SchedulesSection';
import SupportSection from '@/components/home/SupportSection';
import TarifsSection from '@/components/home/TarifsSection';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<div className={styles.introWrapper}>
				<div className={styles.quickSearchWrapper}>
					<QuickSearch />
				</div>
				<div className={styles.carouselWrapper}>
					<HomeCarousel />
				</div>
			</div>
			<SchedulesSection />
			<NewsSection />
			<TarifsSection />
			<SupportSection />
			<MetricsSection />
			<FeaturedSection />
		</>
	);
}