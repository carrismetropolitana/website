'use client';

/* * */

import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	backButtonHref?: string
	backRouter?: boolean
	children?: React.ReactNode
	childrenWrapperStyles?: string
	className?: string
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

export function Section({ backButtonHref = '', backRouter = false, children, childrenWrapperStyles = '', className, heading = '', subheading = '', withChildrenNudge = false, withChildrenPadding = false, withGap = true, withHeadingNudge = true, withTopBorder = true, withTopPadding = true }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('layout.Section');

	//
	// B. Handle actions

	const handleBackButtonClick = () => {
		router.back();
	};

	//
	// C. Render components

	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withTopPadding && styles.withTopPadding} ${withGap && styles.withGap} ${className && className}`}>
			{(backButtonHref || backRouter || heading || subheading) && (
				<div className={`${styles.headingWrapper} ${withHeadingNudge && styles.withHeadingNudge}`}>
					{backButtonHref && (
						<Link className={styles.backButton} href={backButtonHref}>
							<IconArrowLeft size={14} />
							<span className={styles.backButtonLabel}>{t('back.label')}</span>
						</Link>
					)}
					{backRouter && !backButtonHref && (
						<div className={styles.backButton} onClick={handleBackButtonClick}>
							<IconArrowLeft size={14} />
							<span className={styles.backButtonLabel}>{t('back.label')}</span>
						</div>
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
