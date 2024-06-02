'use client';

/* * */

import FrontendUserAvatar from '@/components/FrontendUserAvatar';
import { Link } from '@/translations/navigation';
import { Box, Menu, SegmentedControl } from '@mantine/core';
import { IconArrowNarrowRight, IconListSearch, IconSparkles, IconStar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const NAV_ITEMS = [
	{ _id: 'configs', href: '/profile/configs', icon: <IconSparkles size={20} /> },
	{ _id: 'favorites', href: '/profile/favorites', icon: <IconStar size={20} /> },
	{ _id: 'history', href: '/profile/history', icon: <IconListSearch size={20} /> },
];

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHeaderAccount');
	const [isOpen, setIsOpen] = useState(false);

	//
	// B. Render Components

	return (
		<Menu
			classNames={{ dropdown: styles.menuDropdown, item: styles.menuDropdownItem }}
			loop={false}
			menuItemTabIndex={0}
			offset={-70}
			onChange={setIsOpen}
			opened={isOpen}
			position="bottom-end"
			trigger="click-hover"
			withinPortal={false}
		>
			<Menu.Target>
				<Box>
					<FrontendUserAvatar />
				</Box>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item className={styles.profileMenuItem} component={Link} href="/profile">
					<div className={styles.profileMenuItemInner}>
						Polvo Ecológico
						<FrontendUserAvatar />
					</div>
				</Menu.Item>
				{NAV_ITEMS.map(link => (
					<Menu.Item key={link._id} component={Link} href={link.href} leftSection={link.icon} rightSection={<IconArrowNarrowRight className={styles.menuDropdownItemRightSection} size={20} />} target={link.target}>
						{t(link._id)}
					</Menu.Item>
				))}
				<Menu.Item>
					<SegmentedControl data={['PT', 'EN']} w="100%" />
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);

	//
}
