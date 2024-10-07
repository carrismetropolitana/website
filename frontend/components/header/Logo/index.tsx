/* * */

import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
import { Link } from '@/i18n/routing';
import { BrandsCmet } from '@/settings/assets.settings';
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
			<ThemeSwitch
				dark={<img alt={t('logo.alt')} height={40} src={BrandsCmet.cmet_dark} />}
				light={<img alt={t('logo.alt')} height={40} src={BrandsCmet.cmet_light} />}
			/>
		</Link>
	);

	//
}
