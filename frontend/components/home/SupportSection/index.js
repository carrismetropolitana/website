/* * */

import GridNav from '@/components/layout/GridNav';
import Section from '@/components/layout/Section';
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
		<Section heading={t('section_heading')} withGap={false}>
			<GridNav className={styles.gridNav} items={menuItemsFormatted} />
		</Section>
	);

	//
}
