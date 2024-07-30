/* * */

import HomeFeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import HomeFeaturedSectionMetricDemand from '@/components/home/FeaturedSectionMetricDemand';
import LayoutSection from '@/components/layout/Section';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<LayoutSection withChildrenPadding>
			<div className={styles.innerWrapper}>
				<HomeFeaturedSectionCard coverImageSrc="/images/drivers.png" href="#" title="iudshuisd" />
				<HomeFeaturedSectionCard coverImageSrc="/images/loures.png" href="#" title="iudshuisd" />
				<HomeFeaturedSectionMetricDemand />
			</div>
		</LayoutSection>
	);
}
