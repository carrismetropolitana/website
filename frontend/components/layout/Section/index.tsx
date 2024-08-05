/* * */

import { Link } from '@/translations/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface SectionProps {
	backButtonHref?: string
	children?: React.ReactNode
	heading?: string
	subheading?: string
	withChildrenPadding?: boolean
	withGap?: boolean
	withTopBorder?: boolean
	withTopPadding?: boolean
}

/* * */

export default function Component({ backButtonHref = '', children, heading = '', subheading = '', withChildrenPadding = false, withGap = true, withTopBorder = true, withTopPadding = false }: SectionProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('layout.Section');

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withChildrenPadding && styles.withChildrenPadding} ${withTopPadding && styles.withTopPadding} ${withGap && styles.withGap} ${!heading && !subheading && !withTopPadding && styles.withoutHeadingOrSubheading}`}>
			{heading && (
				<div className={`${styles.headingWrapper}`}>
					{backButtonHref && (
						<Link className={styles.backButton} href={backButtonHref}>
							<IconArrowLeft size={14} />
							<span className={styles.backButtonLabel}>{t('back.label')}</span>
						</Link>
					)}
					<h1 className={styles.heading}>{heading}</h1>
					{subheading && <h6 className={styles.subheading}>{subheading}</h6>}
				</div>
			)}
			<div className={`${styles.childrenWrapper}`}>
				{children}
			</div>
		</div>
	);

	//
}
