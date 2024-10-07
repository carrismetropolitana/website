/* * */

import { Routes } from '@/utils/routes';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<Link className={`${styles.iconWtapper} ${styles.facebook}`} href={Routes.FACEBOOK} rel="noopener noreferrer" target="_blank">
				<IconBrandFacebook />
			</Link>
			<Link className={`${styles.iconWtapper} ${styles.instagram}`} href={Routes.INSTAGRAM} rel="noopener noreferrer" target="_blank">
				<IconBrandInstagram />
			</Link>
			<Link className={`${styles.iconWtapper} ${styles.twitter}`} href={Routes.X} rel="noopener noreferrer" target="_blank">
				<IconBrandTwitter />
			</Link>
			<Link className={`${styles.iconWtapper} ${styles.whatsapp}`} href={Routes.WHATSAPP} rel="noopener noreferrer" target="_blank">
				<IconBrandWhatsapp />
			</Link>
		</div>
	);
}
