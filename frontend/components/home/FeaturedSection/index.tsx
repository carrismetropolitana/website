/* * */

import FeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import Section from '@/components/layout/Section';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section childrenWrapperStyles={styles.innerWrapper} withTopPadding={false} withChildrenPadding>
			<FeaturedSectionCard coverImageSrc="/images/drivers.png" href="#" title="1" />
			<FeaturedSectionCard coverImageSrc="/images/loures.png" href="#" title="2" />
			<FeaturedSectionCard coverImageSrc="#" href="#" title="3" />
		</Section>
	);
}
