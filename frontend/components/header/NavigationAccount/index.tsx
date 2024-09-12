'use client';

/* * */

import AccountUserAvatar from '@/components/account/UserAvatar';
import HeaderLocaleSwitcher from '@/components/header/LocaleSwitcher';
import NavigationMainMenuItem from '@/components/header/NavigationMainMenuItem';
import SyncAccount from '@/components/profile/sync';
import { accountNavigationGroup } from '@/settings/navigation.settings';
import { CloseButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.NavigationAccount');
	const accountNavLabels = useTranslations('settings.navigation.account');
	const navigationGroup = accountNavigationGroup.find(navGroup => navGroup._id === 'primary');

	const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] = useDisclosure(false);

	//
	// B. Transform data

	const menuItemsFormatted = navigationGroup?.links.map(item => ({ ...item, label: accountNavLabels(`primary.links.${item._id}`) })) || [];

	//
	// C. Render Components

	return (
		<>
			<Drawer
				onClose={closeDrawer}
				opened={isDrawerOpen}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				position="right"
				styles={{ body: { padding: 0 } }}
				withCloseButton={false}
				zIndex={500}
			>
				<div className={styles.userProfile}>
					<AccountUserAvatar withName />
					<CloseButton onClick={closeDrawer} />
				</div>
				<div className={styles.navList}>
					{menuItemsFormatted.map(item => (
						<NavigationMainMenuItem key={item._id} label={item.label} navigationLink={item} onClick={closeDrawer} />
					))}
				</div>
				<div className={styles.componentWrapper}>
					<HeaderLocaleSwitcher />
				</div>
				<div className={`${styles.componentWrapper} ${styles.topBorder}`}>
					<SyncAccount />
				</div>
			</Drawer>
			<AccountUserAvatar component="button" onClick={openDrawer} />
		</>
	);

	//
}
