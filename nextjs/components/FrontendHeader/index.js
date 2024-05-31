/* * */

import FrontendContentWrapper from '@/components/FrontendContentWrapper';
import { Link } from '@/translations/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHeader');

	//
	// B. Render Components

	return (
		<>
			<div className={`${styles.container} ${styles.fixed}`}>
				<FrontendContentWrapper>
					<div className={styles.innerWrapper}>
						<Link href="https://www.carrismetropolitana.pt">
							<img alt={t('logo.alt')} height={40} src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana.svg" />
						</Link>
					</div>
				</FrontendContentWrapper>
			</div>
			<div className={`${styles.container} ${styles.hidden}`}>
				<div className={styles.innerWrapper}>
					<Link href="https://www.carrismetropolitana.pt">
						<img alt={t('logo.alt')} height={40} src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/carris-metropolitana.svg" />
					</Link>
				</div>
			</div>
		</>
	);

	//
}
