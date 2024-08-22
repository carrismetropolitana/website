/* * */

import FooterDebugToggle from '@/components/footer/DebugToggle';
import FooterVersionControl from '@/components/footer/VersionControl';
import { Link } from '@/translations/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const PRIMARY_LINKS = [
	{ _id: 'about', href: '/about', target: '_self' },
	{ _id: 'open-data', href: '/open-data', target: '_self' },
	{ _id: 'status', href: 'https://status.carrismetropolitana.pt/', target: '_blank' },
];

const SECONDARY_LINKS = [
	{ _id: 'conditions', href: '/conditions', target: '_self' },
	{ _id: 'privacy', href: '/privacy', target: '_self' },
	{ _id: 'cookies', href: '/cookies', target: '_self' },
	{ _id: 'legal', href: '/legal', target: '_self' },
];

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
				{PRIMARY_LINKS.map(item => (<Link key={item._id} className={styles.primaryLink} href={item.href} target={item.target}>{t(`primary_links.${item._id}`)}</Link>))}
			</div>
			<div className={styles.sectionWrapper}>
				<div className={styles.linksWrapper}>
					{SECONDARY_LINKS.map(item => (<Link key={item._id} className={styles.secondaryLink} href={item.href} target={item.target}>{t(`secondary_links.${item._id}`)}</Link>))}
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