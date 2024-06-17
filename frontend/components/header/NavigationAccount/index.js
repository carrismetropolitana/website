'use client';

/* * */

import AccountUserAvatar from '@/components/account/UserAvatar';
import HeaderLocaleSwitcher from '@/components/header/LocaleSwitcher';
import NavigationMainMenuItem from '@/components/header/NavigationMainMenuItem';
import { CloseButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconListSearch, IconSparkles, IconStar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

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

	const t = useTranslations('HeaderNavigationAccount');
	const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] = useDisclosure(false);

	//
	// B. Render Components

	return (
		<>
			<Drawer
				onClose={closeDrawer}
				opened={isDrawerOpen}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				position="right"
				styles={{ body: { padding: 0 } }}
				withCloseButton={false}
			>
				<div className={styles.userProfile}>
					<AccountUserAvatar withName />
					<CloseButton onClick={closeDrawer} />
				</div>
				<div className={styles.navList}>
					{NAV_ITEMS.map(item => (
						<NavigationMainMenuItem key={item._id} href={item.href} icon={item.icon} label={t(item._id)} />
					))}
				</div>
				<div className={styles.componentWrapper}>
					<HeaderLocaleSwitcher />
				</div>
			</Drawer>
			<AccountUserAvatar component="button" onClick={openDrawer} />
		</>
	);

	//
}