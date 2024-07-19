/* * */

import NavigationMainMenu from '@/components/header/NavigationMainMenu';
import { IconAlertTriangle, IconArrowLoopRight, IconBellSchool, IconBook, IconBusStop, IconCircleDotted, IconDirections, IconHelpHexagon, IconMessage, IconPhoneCheck, IconTicket, IconUmbrella, IconUserPentagon } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

const NAV_ITEMS = [
	{
		_id: 'schedules',
		links: [
			{ _id: 'lines', href: '/lines', icon: <IconArrowLoopRight size={20} /> },
			{ _id: 'stops', href: '/stops', icon: <IconBusStop size={20} /> },
			{ _id: 'planner', href: '/planner', icon: <IconDirections size={20} /> },
			{ _id: 'alerts', href: '/alerts', icon: <IconAlertTriangle size={20} /> },
			{ _id: 'schools', href: '/schools', icon: <IconBellSchool size={20} /> },
			{ _id: 'flyers', href: 'https://meuhorario.carrismetropolitana.pt', icon: <IconBook size={20} />, target: '_blank' },
		],
	},
	{
		_id: 'tarifs',
		links: [
			{ _id: 'tickets', href: '/tickets', icon: <IconTicket size={20} /> },
			{ _id: 'navegante', href: 'https://www.navegante.pt', icon: <IconCircleDotted size={20} />, target: '_blank' },
			{ _id: 'stores', href: '/stores', icon: <IconUserPentagon size={20} /> },
		],
	},
	{
		_id: 'help',
		links: [
			{ _id: 'faq', href: '/faq', icon: <IconHelpHexagon size={20} /> },
			{ _id: 'lost-and-found', href: '/lost-and-found', icon: <IconUmbrella size={20} /> },
			{ _id: 'complaints', href: '/complaints', icon: <IconMessage size={20} /> },
			{ _id: 'stores', href: '/stores', icon: <IconUserPentagon size={20} /> },
			{ _id: 'contacts', href: '/contacts', icon: <IconPhoneCheck size={20} /> },
		],
	},
];

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			{NAV_ITEMS.map(item => (<NavigationMainMenu key={item._id} item={item} />))}
		</div>
	);
}
