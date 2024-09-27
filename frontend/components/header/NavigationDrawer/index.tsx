'use client';

/* * */

import AccountUserAvatar from '@/components/account/UserAvatar';
import { ThemeSwitch } from '@/components/common/Theme';
import HeaderLocaleSwitcher from '@/components/header/LocaleSwitcher';
import NavigationMainMenuItem from '@/components/header/NavigationMainMenuItem';
import SyncAccount from '@/components/profile/sync';
import { BrandsCmet } from '@/settings/assets.settings';
import { drawerNavigationGroup } from '@/settings/navigation.settings';
import { CloseButton, Drawer, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenuDeep } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('settings.navigation');

	const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] = useDisclosure(false);

	//
	// B. Transform data
	const menuItemsFormatted = drawerNavigationGroup.map(group => ({
		items: group.links.map(item => ({
			...item,
			label: t(`${group._id}.links.${item._id}`),
		})),
		label: t(`${group._id}.label`),
	}));

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
				<div className={styles.drawerContent}>
					<div className={styles.userProfile}>
						{/* TODO: Stage 2 */}
						{/* <AccountUserAvatar withName /> */}
						<ThemeSwitch
							dark={<Image alt="Logo" height={40} src={BrandsCmet.cmet_dark} />}
							light={<Image alt="Logo" height={40} src={BrandsCmet.cmet_light} />}
						/>
						<CloseButton onClick={closeDrawer} />
					</div>
					<div className={styles.navList}>
						{menuItemsFormatted.map((group, index) => (
							<div key={index} className={styles.group}>
								<span className={styles.groupLabel}>{group.label}</span>
								{group.items.map(item => (
									<NavigationMainMenuItem key={item._id} label={item.label} navigationLink={item} onClick={closeDrawer} />
								))}
							</div>
						))}
					</div>
					{/* TODO: Stage 2 */}
					{/* <div className={styles.componentWrapper}>
						<HeaderLocaleSwitcher />
					</div> */}
					{/* <div className={`${styles.componentWrapper} ${styles.topBorder}`}>
						<SyncAccount />
					</div> */}
				</div>
			</Drawer>
			<IconMenuDeep className={styles.menuIcon} onClick={openDrawer} />
			{/* <AccountUserAvatar component="button" onClick={openDrawer} /> */}
		</>
	);

	//
}
