'use client';

/* * */

import HeaderNavigationMainMenuItem from '@/components/header/NavigationMainMenuItem';
import { Menu, UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { forwardRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

const MenuItemProxy = forwardRef(
	({ label, navigationLink, ...others }, ref) => (
		<HeaderNavigationMainMenuItem ref={ref} label={label} navigationLink={navigationLink} {...others} />
	),
);

/* * */

export default function Component({ item }) {
	//

	//
	// A. Setup variables

	const mainNavLabels = useTranslations('settings.navigation');

	const [isOpen, setIsOpen] = useState(false);

	//
	// B. Render Components

	return (
		<Menu
			classNames={{ dropdown: styles.menuDropdown }}
			loop={false}
			menuItemTabIndex={0}
			offset={0}
			onChange={setIsOpen}
			opened={isOpen}
			position="bottom-start"
			trigger="click-hover"
			withinPortal={false}
		>
			<Menu.Target>
				<UnstyledButton classNames={{ root: `${styles.menuItemTarget} ${isOpen && styles.isOpen}` }}>{mainNavLabels(`${item._id}.label`)}</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				{item.links.map(link => (
					<MenuItemProxy key={link._id} label={mainNavLabels(`${item._id}.links.${link._id}`)} navigationLink={link} />
				))}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
