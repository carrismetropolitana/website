/* * */

import LayoutGridNav from '@/components/layout/GridNav';
import LayoutSection from '@/components/layout/Section';
import { IconHelpHexagon, IconMessage, IconPhoneCheck, IconUmbrella, IconUserPentagon } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const MENU_ITEMS = [
	{ _id: 'faq', href: '/', icon: <IconHelpHexagon /> },
	{ _id: 'lost-and-found', href: '/', icon: <IconUmbrella /> },
	{ _id: 'complaints', href: '/', icon: <IconMessage /> },
	{ _id: 'stores', href: '/', icon: <IconUserPentagon /> },
	{ _id: 'contacts', href: '/', icon: <IconPhoneCheck /> },
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
		<LayoutSection heading={t('section_heading')}>
			<LayoutGridNav className={styles.gridNav} items={menuItemsFormatted} />
		</LayoutSection>
	);

	//
}
