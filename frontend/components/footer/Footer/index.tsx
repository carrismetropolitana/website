/* * */

import FooterDebugToggle from '@/components/footer/DebugToggle';
import FooterVersionControl from '@/components/footer/VersionControl';
import { footerPrimaryNavigationLinks, footerSecondaryNavigationLinks } from '@/settings/navigation';
import { Link } from '@/translations/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.Footer');

	const currentYear = new Date().getFullYear();

	//
	// B. Render Components

	return (
		<footer className={styles.container}>
			<div className={`${styles.sectionWrapper} ${styles.linksWrapper}`}>
				{footerPrimaryNavigationLinks.map(item => (<Link key={item._id} className={styles.primaryLink} href={item.href} target={item.target}>{t(`primary_links.${item._id}`)}</Link>))}
			</div>
			<div className={styles.sectionWrapper}>
				<div className={styles.linksWrapper}>
					{footerSecondaryNavigationLinks.map(item => (<Link key={item._id} className={styles.secondaryLink} href={item.href} target={item.target}>{t(`secondary_links.${item._id}`)}</Link>))}
				</div>
				<div className={styles.linksWrapper}>
					<FooterVersionControl className={styles.tertiaryLink} />
					<FooterDebugToggle className={styles.tertiaryLink} />
				</div>
				<div className={styles.linksWrapper}>
					<p className={styles.copyright}>{t('copyright', { year: currentYear })}</p>
				</div>
			</div>
		</footer>
	);

	//
}
