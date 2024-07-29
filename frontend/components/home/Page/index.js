/* * */

import HomeCarousel from '@/components/home/Carousel';
import HomeFeaturedSection from '@/components/home/FeaturedSection';
import HomeNewsSection from '@/components/home/NewsSection';
import HomeQuickSearch from '@/components/home/QuickSearch';
import HomeSchedulesSection from '@/components/home/SchedulesSection';
import HomeSupportSection from '@/components/home/SupportSection';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<div className={styles.introWrapper}>
				<div className={styles.quickSearchWrapper}>
					<HomeQuickSearch />
				</div>
				<div className={styles.carouselWrapper}>
					<HomeCarousel />
				</div>
			</div>
			<HomeSchedulesSection />
			<HomeNewsSection />
			<HomeSupportSection />
			<HomeFeaturedSection />
		</>
	);
}
