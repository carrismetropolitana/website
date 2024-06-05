'use client';

/* * */

import FrontendGridNav from '@/components/FrontendGridNav';
import FrontendSection from '@/components/FrontendSection';
import { IconAlertTriangle, IconArrowLoopRight, IconBusStop, IconSignRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

const MENU_ITEMS = [
	{ _id: 'lines', href: '/', icon: <IconArrowLoopRight size={20} /> },
	{ _id: 'stops', href: '/', icon: <IconBusStop size={20} /> },
	{ _id: 'planner', href: '/', icon: <IconSignRight size={20} /> },
	{ _id: 'alerts', href: '/', icon: <IconAlertTriangle size={20} /> },
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHomepageSchedules');

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
