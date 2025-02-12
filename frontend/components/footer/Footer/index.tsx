'use client';

/* * */

import { Link } from '@/components/common/Link';
import { DebugToggle } from '@/components/footer/DebugToggle';
import { SocialIcons } from '@/components/footer/SocialIcons';
import { VersionControl } from '@/components/footer/VersionControl';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useDebugContext } from '@/contexts/Debug.context';
import { footerNavigationGroup } from '@/settings/navigation.settings';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Footer() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.Footer');
	const footerNavLabels = useTranslations('settings.navigation.footer');
	const primaryNavigationGroup = footerNavigationGroup.find(navGroup => navGroup._id === 'primary');
	const secondaryNavigationGroup = footerNavigationGroup.find(navGroup => navGroup._id === 'secondary');

	const debugContext = useDebugContext();

	const currentYear = new Date().getFullYear();

	//
	// B. Transform data

	const primaryMenuItemsFormatted = primaryNavigationGroup?.links.map(item => ({ ...item, label: footerNavLabels(`primary.links.${item._id}`) })) || [];
	const secondaryMenuItemsFormatted = secondaryNavigationGroup?.links.map(item => ({ ...item, label: footerNavLabels(`secondary.links.${item._id}`) })) || [];

	//
	// C. Render Components

	return (
		<Surface variant={debugContext.flags.is_debug_mode ? 'debug' : 'default'}>
			<Section withBottomDivider withPadding>
				<div className={styles.linksWrapper}>
					<div className={styles.linksWrapper}>
						{primaryMenuItemsFormatted.map(item => (
							<Link key={item._id} className={styles.primaryLink} href={item.href} target={item.target}>{item.label}</Link>
						))}
					</div>
					<SocialIcons />
				</div>
			</Section>
			<Section withGap withPadding>
				<div className={styles.linksWrapper}>
					{secondaryMenuItemsFormatted.map(item => (
						<Link key={item._id} className={styles.secondaryLink} href={item.href} target={item.target}>{item.label}</Link>
					))}
				</div>
				<div className={styles.linksWrapper}>
					<VersionControl className={styles.tertiaryLink} />
					<DebugToggle className={styles.tertiaryLink} />
				</div>
				<div className={styles.linksWrapper}>
					<p className={styles.copyright}>{t('copyright', { year: currentYear })}</p>
				</div>
			</Section>
		</Surface>
	);

	//
}
