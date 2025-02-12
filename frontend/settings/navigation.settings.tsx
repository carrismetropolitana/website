/* * */

import type { NavigationGroup } from '@/types/navigation.types';

import { RoutesFooter, RoutesPricing, RoutesSchedule, RoutesSupport } from '@/utils/routes';
import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBuildingStore, IconBus, IconBusStop, IconChartBar, IconCreditCardPay, IconDirections, IconHelpHexagon, IconHomeSpark, IconMapQuestion, IconMessages, IconNews, IconPrompt, IconTicket, IconUmbrella, IconUserHeart } from '@tabler/icons-react';

/* * */

export const mainNavigationGroup: NavigationGroup[] = [

	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: RoutesSchedule.LINES.route, icon: <IconArrowLoopRight /> },
			{ _id: 'stops', href: RoutesSchedule.STOPS.route, icon: <IconBusStop /> },
			{ _id: 'planner', href: RoutesSchedule.PLANNER.route, icon: <IconDirections /> },
			{ _id: 'alerts', href: RoutesSchedule.ALERTS.route, icon: <IconAlertTriangle /> },
			{ _id: 'schools', href: RoutesSchedule.SCHOOLS, icon: <IconBellSchool />, target: '_blank' },
		],
	},

	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: RoutesPricing.TICKETS.route, icon: <IconTicket /> },
			{ _id: 'cards', href: RoutesPricing.CARDS.route, icon: <IconCreditCardPay /> },
			{ _id: 'helpdesks', href: RoutesPricing.HELPDESKS.route, icon: <IconMapQuestion /> },
		],
	},

	{
		_id: 'support',
		links: [
			{ _id: 'faq', href: RoutesSupport.FAQ.route, icon: <IconHelpHexagon /> },
			{ _id: 'lost-and-found', href: RoutesSupport.LOST_AND_FOUND.route, icon: <IconUmbrella /> },
			{ _id: 'stores', href: RoutesSupport.STORES.route, icon: <IconBuildingStore /> },
			{ _id: 'contacts', href: RoutesSupport.CONTACTS.route, icon: <IconMessages /> },
		],
	},

	{
		_id: 'more',
		links: [
			{ _id: 'news', href: '/news', icon: <IconNews /> },
			{ _id: 'metrics', href: '/metrics', icon: <IconChartBar /> },
			{ _id: 'open-data', href: '/open-data', icon: <IconPrompt /> },
			{ _id: 'drivers', href: '/drivers', icon: <IconUserHeart />, target: '_blank' },
			{ _id: 'about', href: '/about', icon: <IconHomeSpark /> },
			{ _id: 'vehicles', href: '/vehicles', icon: <IconBus /> },
		],
	},

];

/* * */

export const drawerNavigationGroup: NavigationGroup[] = [

	// TODO: Stage 2
	// {
	// 	_id: 'account',
	// 	links: [
	// 		{ _id: 'configs', href: RoutesProfile.CONFIGS, icon: <IconSparkles /> },
	// 		{ _id: 'favorites', href: RoutesProfile.FAVORITES, icon: <IconStar /> },
	// 		{ _id: 'profile', href: RoutesProfile.PROFILE, icon: <IconUser /> },
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
