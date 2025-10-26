/* * */

import { JSX } from 'react';

/* * */

export interface NavigationGroup {
	_id: string
	links: NavigationLink[]
}

/* * */

export interface NavigationLink {
	_id: string
	href: string
	icon?: JSX.Element
	target?: '_blank' | '_self'
}
