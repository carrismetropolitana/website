/* * */

import FrontendHomepageCarousel from '@/components/FrontendHomepageCarousel';
import FrontendHomepageNews from '@/components/FrontendHomepageNews';
import FrontendHomepageSchedules from '@/components/FrontendHomepageSchedules';
import FrontendHomepageSupport from '@/components/FrontendHomepageSupport';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<div className={styles.featuredWrapper}>
				<div className={styles.quickSearchWrapper}>quick search widget</div>
				<div className={styles.carouselWrapper}>
					<FrontendHomepageCarousel />
				</div>
			</div>
			<FrontendHomepageSchedules />
			<FrontendHomepageNews />
			<FrontendHomepageSupport />
		</>
	);
}
