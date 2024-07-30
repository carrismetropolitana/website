/* * */

import HomeFeaturedSectionCard from '@/components/home/FeaturedSectionCard';
import HomeFeaturedSectionMetricDemand from '@/components/home/FeaturedSectionMetricDemand';
import LayoutSection from '@/components/layout/Section';
import { IconHelpHexagon, IconMessage, IconPhoneCheck, IconUmbrella, IconUserPentagon } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const MENU_ITEMS = [
	{ _id: 'faq', href: '/faq', icon: <IconHelpHexagon /> },
	{ _id: 'lost-and-found', href: '/lost-and-found', icon: <IconUmbrella /> },
	{ _id: 'complaints', href: '/complaints', icon: <IconMessage /> },
	{ _id: 'stores', href: '/stores', icon: <IconUserPentagon /> },
	{ _id: 'contacts', href: '/contacts', icon: <IconPhoneCheck /> },
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeSupportSection');

	//
	// B. Transform data

	const menuItemsFormatted = MENU_ITEMS.map(item => ({ ...item, label: t(`nav_items.${item._id}`) }));

	//
	// C. Render Components

	return (
		<LayoutSection withGlobalPadding>
			<div className={styles.innerWrapper}>
				<HomeFeaturedSectionCard coverImageSrc="/images/drivers.png" href="#" title="iudshuisd" />
				<HomeFeaturedSectionCard coverImageSrc="/images/loures.png" href="#" title="iudshuisd" />
				<HomeFeaturedSectionMetricDemand />
			</div>
		</LayoutSection>
	);

	//
}
