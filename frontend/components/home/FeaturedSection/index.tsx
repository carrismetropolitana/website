/* * */

import FeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import { Section } from '@/components/layout/Section';
import { ImagesHome } from '@/settings/assets.settings';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section childrenWrapperStyles={styles.innerWrapper} withTopPadding={false} withChildrenPadding>
			<FeaturedSectionCard coverImageSrc={ImagesHome.DRIVERS} href="#" title="1" />
			<FeaturedSectionCard coverImageSrc={ImagesHome.CASO_DE_ESTUDO_LOURES} href="#" title="2" />
			<FeaturedSectionCard coverImageSrc="#" href="#" title="3" />
		</Section>
	);
}
