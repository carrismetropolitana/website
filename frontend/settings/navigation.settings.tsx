/* * */

import type { NavigationGroup } from '@/types/navigation.types';

import { RoutesFooter, RoutesPricing, RoutesProfile, RoutesSchedule, RoutesSupport } from '@/utils/routes';
import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBuildingStore, IconBusStop, IconCreditCardPay, IconDirections, IconHelpHexagon, IconMapQuestion, IconMessages, IconSparkles, IconStar, IconTicket, IconUmbrella, IconUser } from '@tabler/icons-react';

/* * */

export const mainNavigationGroup: NavigationGroup[] = [

	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: RoutesSchedule.LINES, icon: <IconArrowLoopRight size={20} /> },
			{ _id: 'stops', href: RoutesSchedule.STOPS, icon: <IconBusStop size={20} /> },
			{ _id: 'planner', href: RoutesSchedule.PLANNER, icon: <IconDirections size={20} /> },
			{ _id: 'alerts', href: RoutesSchedule.ALERTS, icon: <IconAlertTriangle size={20} /> },
			{ _id: 'schools', href: RoutesSchedule.SCHOOLS, icon: <IconBellSchool size={20} />, target: '_blank' },
		],
	},

	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: RoutesPricing.TICKETS, icon: <IconTicket size={20} /> },
			{ _id: 'cards', href: RoutesPricing.CARDS, icon: <IconCreditCardPay size={20} /> },
			{ _id: 'helpdesks', href: RoutesPricing.HELPDESKS, icon: <IconMapQuestion size={20} /> },
		],
	},

	{
		_id: 'support',
		links: [
			{ _id: 'faq', href: RoutesSupport.FAQ, icon: <IconHelpHexagon size={20} /> },
			{ _id: 'lost-and-found', href: RoutesSupport.LOST_AND_FOUND, icon: <IconUmbrella size={20} /> },
			{ _id: 'stores', href: RoutesSupport.STORES, icon: <IconBuildingStore size={20} /> },
			{ _id: 'contacts', href: RoutesSupport.CONTACTS, icon: <IconMessages size={20} /> },
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
			{ _id: 'about', href: RoutesFooter.ABOUT },
			{ _id: 'open-data', href: RoutesFooter.OPEN_DATA },
			{ _id: 'status', href: RoutesFooter.STATUS, target: '_blank' },
		],
	},

	{
		_id: 'secondary',
		links: [
			{ _id: 'conditions', href: RoutesFooter.CONDITIONS },
			{ _id: 'privacy', href: RoutesFooter.PRIVACY },
			{ _id: 'cookies', href: RoutesFooter.COOKIES },
			{ _id: 'legal', href: RoutesFooter.LEGAL },
		],
	},

];
