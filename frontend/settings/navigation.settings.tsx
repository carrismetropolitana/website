/* * */

import type { NavigationGroup } from '@/types/navigation.types';

import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBuildingStore, IconBusStop, IconCreditCardPay, IconDirections, IconHelpHexagon, IconMapQuestion, IconMessages, IconSparkles, IconStar, IconTicket, IconUmbrella, IconUser } from '@tabler/icons-react';

/* * */

export const mainNavigationGroup: NavigationGroup[] = [

	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: '/lines', icon: <IconArrowLoopRight size={20} /> },
			{ _id: 'stops', href: '/stops', icon: <IconBusStop size={20} /> },
			{ _id: 'planner', href: '/planner', icon: <IconDirections size={20} /> },
			{ _id: 'alerts', href: '/alerts', icon: <IconAlertTriangle size={20} /> },
			{ _id: 'schools', href: 'https://escolas.carrismetropolitana.pt', icon: <IconBellSchool size={20} />, target: '_blank' },
		],
	},

	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: '/tickets', icon: <IconTicket size={20} /> },
			{ _id: 'cards', href: '/cards', icon: <IconCreditCardPay size={20} /> },
			{ _id: 'helpdesks', href: '/helpdesks', icon: <IconMapQuestion size={20} /> },
		],
	},

	{
		_id: 'support',
		links: [
			{ _id: 'faq', href: '/faq', icon: <IconHelpHexagon size={20} /> },
			{ _id: 'lost-and-found', href: '/lost-and-found', icon: <IconUmbrella size={20} /> },
			{ _id: 'stores', href: '/stores', icon: <IconBuildingStore size={20} /> },
			{ _id: 'contacts', href: '/contacts', icon: <IconMessages size={20} /> },
		],
	},

];

/* * */

export const accountNavigationGroup: NavigationGroup[] = [

	{
		_id: 'primary',
		links: [
			{ _id: 'configs', href: '/profile/configs', icon: <IconSparkles size={20} /> },
			{ _id: 'favorites', href: '/profile/favorites', icon: <IconStar size={20} /> },
			{ _id: 'profile', href: '/profile', icon: <IconUser size={20} /> },
		],
	},

];

/* * */

export const footerNavigationGroup: NavigationGroup[] = [

	{
		_id: 'primary',
		links: [
			{ _id: 'about', href: '/about' },
			{ _id: 'open-data', href: '/open-data' },
			{ _id: 'status', href: 'https://status.carrismetropolitana.pt/', target: '_blank' },
		],
	},

	{
		_id: 'secondary',
		links: [
			{ _id: 'conditions', href: '/conditions' },
			{ _id: 'privacy', href: '/privacy' },
			{ _id: 'cookies', href: '/cookies' },
			{ _id: 'legal', href: '/legal' },
		],
	},

];
