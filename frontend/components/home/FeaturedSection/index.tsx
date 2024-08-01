/* * */

import FeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import Section from '@/components/layout/Section';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section withChildrenPadding>
			<div className={styles.innerWrapper}>
				<FeaturedSectionCard coverImageSrc="/images/drivers.png" href="#" title="iudshuisd" />
				<FeaturedSectionCard coverImageSrc="/images/loures.png" href="#" title="iudshuisd" />
			</div>
		</Section>
	);
}
