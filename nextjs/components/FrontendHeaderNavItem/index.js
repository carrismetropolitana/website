'use client';

/* * */

import { Link } from '@/translations/navigation';
import { Menu, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
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
			classNames={{ dropdown: styles.menuDropdown, item: styles.menuDropdownItem }}
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
					<Menu.Item key={link._id} component={Link} href={link.href} leftSection={link.icon} rightSection={<IconArrowNarrowRight className={styles.menuDropdownItemRightSection} size={20} />} target={link.target}>
						{t(link._id)}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
