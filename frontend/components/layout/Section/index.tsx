/* * */

import { Link } from '@/translations/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface SectionProps {
	backButtonHref?: string
	children?: React.ReactNode
	childrenWrapperStyles?: string
	heading?: string
	subheading?: string
	withChildrenNudge?: boolean
	withChildrenPadding?: boolean
	withGap?: boolean
	withHeadingNudge?: boolean
	withTopBorder?: boolean
	withTopPadding?: boolean
}

/* * */

export default function Component({ backButtonHref = '', children, childrenWrapperStyles = '', heading = '', subheading = '', withChildrenNudge = false, withChildrenPadding = false, withGap = true, withHeadingNudge = true, withTopBorder = true, withTopPadding = true }: SectionProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('layout.Section');

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withTopPadding && styles.withTopPadding} ${withGap && styles.withGap}`}>
			{(backButtonHref || heading || subheading) && (
				<div className={`${styles.headingWrapper} ${withHeadingNudge && styles.withHeadingNudge}`}>
					{backButtonHref && (
						<Link className={styles.backButton} href={backButtonHref}>
							<IconArrowLeft size={14} />
							<span className={styles.backButtonLabel}>{t('back.label')}</span>
						</Link>
					)}
					{heading && <h1 className={styles.heading}>{heading}</h1>}
					{subheading && <h6 className={styles.subheading}>{subheading}</h6>}
				</div>
			)}
			{children && (
				<div className={`${styles.childrenWrapper} ${withChildrenPadding && styles.withChildrenPadding} ${withChildrenNudge && styles.withChildrenNudge} ${childrenWrapperStyles && childrenWrapperStyles}`}>
					{children}
				</div>
			)}
		</div>
	);

	//
}
