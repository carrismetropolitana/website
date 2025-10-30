/* * */

import { Link } from '@/components/common/Link';
import { URLS } from '@/settings/urls.settings';
import { IconBrandAndroid, IconBrandApple, IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

export function SocialIcons() {
	return (
		<div className={styles.container}>

			<Link aria-label="Apple Store" className={`${styles.iconWrapper} ${styles.apple}`} href={URLS.app.apple_app_store.prod} rel="noopener noreferrer" target="_blank">
				<IconBrandApple />
			</Link>

			<Link aria-label="Google Play Store" className={`${styles.iconWrapper} ${styles.android}`} href={URLS.app.google_play_store.prod} rel="noopener noreferrer" target="_blank">
				<IconBrandAndroid />
			</Link>

			<div className={styles.divider} />

			<Link aria-label="Facebook" className={`${styles.iconWrapper} ${styles.facebook}`} href={URLS.socials.facebook} rel="noopener noreferrer" target="_blank">
				<IconBrandFacebook />
			</Link>
			<Link aria-label="Instagram" className={`${styles.iconWrapper} ${styles.instagram}`} href={URLS.socials.instagram} rel="noopener noreferrer" target="_blank">
				<IconBrandInstagram />
			</Link>
			<Link aria-label="Twitter" className={`${styles.iconWrapper} ${styles.twitter}`} href={URLS.socials.twitter} rel="noopener noreferrer" target="_blank">
				<IconBrandTwitter />
			</Link>
			<Link aria-label="WhatsApp" className={`${styles.iconWrapper} ${styles.whatsapp}`} href={URLS.socials.whatsapp} rel="noopener noreferrer" target="_blank">
				<IconBrandWhatsapp />
			</Link>
		</div>
	);
}
