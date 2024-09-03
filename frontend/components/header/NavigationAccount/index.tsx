'use client';

/* * */

import AccountUserAvatar from '@/components/account/UserAvatar';
import HeaderLocaleSwitcher from '@/components/header/LocaleSwitcher';
import NavigationMainMenuItem from '@/components/header/NavigationMainMenuItem';
import SyncAccount from '@/components/profile/sync';
import { headerAccountNavigationLinks } from '@/settings/navigation.settings';
import { CloseButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

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
				zIndex={500}
			>
				<div className={styles.userProfile}>
					<AccountUserAvatar withName />
					<CloseButton onClick={closeDrawer} />
				</div>
				<div className={styles.navList}>
					{headerAccountNavigationLinks.map(item => (
						<NavigationMainMenuItem key={item._id} label={t(item._id)} navigationLink={item} onClick={closeDrawer} />
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
