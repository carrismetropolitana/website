/* * */

import { type NavigationGroup } from '@/types/navigation.types';
import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBuildingStore, IconBus, IconBusStop, IconChartBar, IconCreditCardPay, IconDirections, IconHelpHexagon, IconHomeSpark, IconListSearch, IconMapQuestion, IconMessages, IconNews, IconPrompt, IconTicket, IconUserHeart } from '@tabler/icons-react';

/* * */

export const mainNavigationGroup: NavigationGroup[] = [

	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: '/lines', icon: <IconArrowLoopRight /> },
			{ _id: 'stops', href: '/stops', icon: <IconBusStop /> },
			{ _id: 'planner', href: '/planner', icon: <IconDirections /> },
			{ _id: 'alerts', href: '/alerts', icon: <IconAlertTriangle /> },
			{ _id: 'schools', href: '/schools', icon: <IconBellSchool />, target: '_blank' },
		],
	},

	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: '/tickets', icon: <IconTicket /> },
			{ _id: 'cards', href: '/cards', icon: <IconCreditCardPay /> },
			{ _id: 'helpdesks', href: '/helpdesks', icon: <IconMapQuestion /> },
			{ _id: 'tap-and-ride', href: 'https://tap-and-ride.carrismetropolitana.pt', icon: <IconListSearch />, target: '_blank' },
		],
	},

	{
		_id: 'support',
		links: [
			{ _id: 'faq', href: '/faq', icon: <IconHelpHexagon /> },
			{ _id: 'stores', href: '/stores', icon: <IconBuildingStore /> },
			{ _id: 'contacts', href: '/contacts', icon: <IconMessages /> },
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
			{ _id: 'vehicles', href: '/fleet', icon: <IconBus /> },
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
			{ _id: 'about', href: '/about' },
			{ _id: 'open-data', href: '/open-data' },
			{ _id: 'status', href: 'https://status.carrismetropolitana.pt/status/cm-status', target: '_blank' },
		],
	},

	{
		_id: 'secondary',
		links: [
			{ _id: 'conditions', href: '/assets/legal/cm-condicoes-gerais-transporte.pdf', target: '_blank' },
			{ _id: 'privacy', href: '/privacy' },
			{ _id: 'cookies', href: '/cookies' },
			{ _id: 'legal', href: '/legal' },
			{ _id: 'complaints', href: 'https://www.livroreclamacoes.pt/Pedido/Reclamacao', target: '_blank' },
		],
	},

];
