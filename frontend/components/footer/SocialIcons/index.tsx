/* * */

import { Routes } from '@/utils/routes';
import { IconBrandAndroid, IconBrandApple, IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<Link className={`${styles.iconWrapper} ${styles.apple}`} href={Routes.APPLE_PROD} rel="noopener noreferrer" target="_blank">
				<IconBrandApple />
			</Link>
			<Link className={`${styles.iconWrapper} ${styles.android}`} href={Routes.ANDROID_PROD} rel="noopener noreferrer" target="_blank">
				<IconBrandAndroid />
			</Link>
			<div className={styles.divider} />
			<Link className={`${styles.iconWrapper} ${styles.facebook}`} href={Routes.FACEBOOK} rel="noopener noreferrer" target="_blank">
				<IconBrandFacebook />
			</Link>
			<Link className={`${styles.iconWrapper} ${styles.instagram}`} href={Routes.INSTAGRAM} rel="noopener noreferrer" target="_blank">
				<IconBrandInstagram />
			</Link>
			<Link className={`${styles.iconWrapper} ${styles.twitter}`} href={Routes.X} rel="noopener noreferrer" target="_blank">
				<IconBrandTwitter />
			</Link>
			<Link className={`${styles.iconWrapper} ${styles.whatsapp}`} href={Routes.WHATSAPP} rel="noopener noreferrer" target="_blank">
				<IconBrandWhatsapp />
			</Link>
		</div>
	);
}
