'use client';

/* * */

import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';
import { Button, Modal } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AnalyticsConsentPopup');
	const pathname = usePathname();
	const analyticsContext = useAppAnalyticsContext();

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Check if analyticsContext and pathname are ready
		if (typeof analyticsContext.enabled !== 'boolean' || !pathname) return;
		// Check if pathname is the cookies policy page
		const regexPatternToMatchCookiesPolicy = /^(\/[a-z]{2})?\/cookies\/?$/;
		const isPrivacyPage = regexPatternToMatchCookiesPolicy.test(pathname);
		// Set the modal state based on the context and pathname
		setIsOpen(!analyticsContext.enabled && !isPrivacyPage);
		//
	}, [analyticsContext.enabled, pathname]);

	//
	// B. Handle actions

	const handleEnable = () => {
		analyticsContext.enable();
		setIsOpen(false);
		analyticsContext.capture('test');
	};

	const handleDisable = () => {
		analyticsContext.disable();
		setIsOpen(false);
	};

	//
	// C. Render Components

	return (
		<Modal closeOnClickOutside={false} closeOnEscape={false} onClose={() => setIsOpen(false)} opened={isOpen} overlayProps={{ backgroundOpacity: 0.55, blur: 3 }} returnFocus={true} trapFocus={false} withCloseButton={false}>
			<div className={styles.container}>
				<Image alt="" height={120} src="/images/analytics-header.svg" width={350} priority />
				<h4 className={styles.title}>{t('title')}</h4>
				<h4 className={styles.text}>{t('text')}</h4>
				<Link className={styles.link} href="/legal/cookies" target="_blank">
					{t('privacy_policy')}
				</Link>
				<div className={styles.answers}>
					<Button className={styles.acceptButton} onClick={handleEnable} size="lg">
						{t('accept')}
					</Button>
					<Button className={styles.refuseButton} onClick={handleDisable} size="xs" variant="subtle">
						{t('refuse')}
					</Button>
				</div>
			</div>
		</Modal>
	);

	//
}
