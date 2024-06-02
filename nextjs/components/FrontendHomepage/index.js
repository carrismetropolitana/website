/* * */

import FrontendHomepageCarousel from '@/components/FrontendHomepageCarousel';
import FrontendHomepageNews from '@/components/FrontendHomepageNews';
import FrontendHomepageSupport from '@/components/FrontendHomepageSupport';
import FrontendHomepageTravel from '@/components/FrontendHomepageTravel';

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
			<FrontendHomepageTravel />
			<FrontendHomepageNews />
			<FrontendHomepageSupport />
		</>
	);
}
