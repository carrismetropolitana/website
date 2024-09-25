/* * */

import { Link } from '@/i18n/routing';
import { IconsBrand } from '@/utils/assets';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HeaderLogo');

	//
	// B. Render Components

	return (
		<Link className={styles.container} href="/">
			<theme-light>
				<img alt={t('logo.alt')} height={40} src={IconsBrand.BRAND_LOGO_LIGHT} />
			</theme-light>
			<theme-dark>
				<img alt={t('logo.alt')} height={40} src={IconsBrand.BRAND_LOGO_DARK} />
			</theme-dark>
		</Link>
	);

	//
}
