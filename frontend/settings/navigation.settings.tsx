/* * */

import type { NavigationGroup } from '@/types/navigation.types';

import { RoutesFooter, RoutesPricing, RoutesSchedule, RoutesSupport } from '@/utils/routes';
import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBuildingStore, IconBusStop, IconCreditCardPay, IconDirections, IconHelpHexagon, IconMapQuestion, IconMessages, IconTicket, IconUmbrella } from '@tabler/icons-react';

/* * */

export const mainNavigationGroup: NavigationGroup[] = [

	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: RoutesSchedule.LINES.route, icon: <IconArrowLoopRight size={20} /> },
			{ _id: 'stops', href: RoutesSchedule.STOPS.route, icon: <IconBusStop size={20} /> },
			{ _id: 'planner', href: RoutesSchedule.PLANNER.route, icon: <IconDirections size={20} /> },
			{ _id: 'alerts', href: RoutesSchedule.ALERTS.route, icon: <IconAlertTriangle size={20} /> },
			{ _id: 'schools', href: RoutesSchedule.SCHOOLS, icon: <IconBellSchool size={20} />, target: '_blank' },
		],
	},

	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: RoutesPricing.TICKETS.route, icon: <IconTicket size={20} /> },
			{ _id: 'cards', href: RoutesPricing.CARDS.route, icon: <IconCreditCardPay size={20} /> },
			{ _id: 'helpdesks', href: RoutesPricing.HELPDESKS.route, icon: <IconMapQuestion size={20} /> },
		],
	},

	{
		_id: 'support',
		links: [
			{ _id: 'faq', href: RoutesSupport.FAQ.route, icon: <IconHelpHexagon size={20} /> },
			{ _id: 'lost-and-found', href: RoutesSupport.LOST_AND_FOUND.route, icon: <IconUmbrella size={20} /> },
			{ _id: 'stores', href: RoutesSupport.STORES.route, icon: <IconBuildingStore size={20} /> },
			{ _id: 'contacts', href: RoutesSupport.CONTACTS.route, icon: <IconMessages size={20} /> },
		],
	},

];

/* * */

export const drawerNavigationGroup: NavigationGroup[] = [

	// TODO: Stage 2
	// {
	// 	_id: 'account',
	// 	links: [
	// 		{ _id: 'configs', href: RoutesProfile.CONFIGS, icon: <IconSparkles size={20} /> },
	// 		{ _id: 'favorites', href: RoutesProfile.FAVORITES, icon: <IconStar size={20} /> },
	// 		{ _id: 'profile', href: RoutesProfile.PROFILE, icon: <IconUser size={20} /> },
	// 	],
	// },
	...mainNavigationGroup,
];

/* * */

export const footerNavigationGroup: NavigationGroup[] = [

	{
		_id: 'primary',
		links: [
			{ _id: 'about', href: RoutesFooter.ABOUT.route },
			{ _id: 'open-data', href: RoutesFooter.OPEN_DATA.route },
			{ _id: 'status', href: RoutesFooter.STATUS, target: '_blank' },
		],
	},

	{
		_id: 'secondary',
		links: [
			{ _id: 'conditions', href: RoutesFooter.CONDITIONS.route },
			{ _id: 'privacy', href: RoutesFooter.PRIVACY.route },
			{ _id: 'cookies', href: RoutesFooter.COOKIES.route },
			{ _id: 'legal', href: RoutesFooter.LEGAL.route },
		],
	},

];
