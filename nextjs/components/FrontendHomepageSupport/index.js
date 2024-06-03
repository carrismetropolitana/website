'use client';

/* * */

import FrontendGridNav from '@/components/FrontendGridNav';
import FrontendSection from '@/components/FrontendSection';
import { IconHelpHexagon, IconMessage, IconPhoneCheck, IconUmbrella, IconUserPentagon } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

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

	const t = useTranslations('FrontendHomepageSupport');

	//
	// B. Transform data

	const menuItemsFormatted = MENU_ITEMS.map(item => ({ ...item, label: t(`nav_items.${item._id}`) }));

	//
	// C. Render Components

	return (
		<FrontendSection heading={t('section_heading')}>
			<FrontendGridNav items={menuItemsFormatted} />
		</FrontendSection>
	);

	//
}
