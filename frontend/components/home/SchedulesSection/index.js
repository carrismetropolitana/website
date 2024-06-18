/* * */

import LayoutGridNav from '@/components/layout/GridNav';
import LayoutSection from '@/components/layout/Section';
import { IconAlertTriangle, IconArrowLoopRight, IconBusStop, IconSignRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

const MENU_ITEMS = [
	{ _id: 'lines', href: '/lines', icon: <IconArrowLoopRight size={20} /> },
	{ _id: 'stops', href: '/stops', icon: <IconBusStop size={20} /> },
	{ _id: 'planner', href: '/planner', icon: <IconSignRight size={20} /> },
	{ _id: 'alerts', href: '/alerts', icon: <IconAlertTriangle size={20} /> },
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeSchedulesSection');

	//
	// B. Transform data

	const menuItemsFormatted = MENU_ITEMS.map(item => ({ ...item, label: t(`nav_items.${item._id}`) }));

	//
	// C. Render Components

	return (
		<LayoutSection heading={t('section_heading')}>
			<LayoutGridNav items={menuItemsFormatted} />
		</LayoutSection>
	);

	//
}
