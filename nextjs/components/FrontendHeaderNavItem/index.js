'use client';

/* * */

import FrontendHeaderNavLink from '@/components/FrontendHeaderNavLink';
import { Menu, UnstyledButton } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ item }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHeaderNavItem');
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
				<UnstyledButton classNames={{ root: `${styles.menuItemTarget} ${isOpen && styles.isOpen}` }}>{t(item._id)}</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				{item.links.map(link => (
					<Menu.Item key={link._id} component={FrontendHeaderNavLink} href={link.href} icon={link.icon} label={t(link._id)} target={link.target} />
				))}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
