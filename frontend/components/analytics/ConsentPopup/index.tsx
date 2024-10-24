'use client';

/* * */

import Logo from '@/components/header/Logo';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
// import { BrandsCmet } from '@/settings/assets.settings';
import { Button, Modal } from '@mantine/core';
// import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ConsentPopup() {
	//

	//
	// A. Setup variables

	const t = useTranslations('analytics.ConsentPopup');
	const pathname = usePathname();
	const analyticsContext = useAnalyticsContext();

	const [isOpen, setIsOpen] = useState(false);

	if (analyticsContext === null) return;
	useEffect(() => {
		// Check if analyticsContext and pathname are ready
		if (!pathname) return;
		// Check if pathname is the cookies policy page
		const regexPatternToMatchCookiesPolicy = /^(\/[a-z]{2})?\/cookies\/?$/;
		const isPrivacyPage = regexPatternToMatchCookiesPolicy.test(pathname);
		// Set the modal state based on the context and pathname
		setIsOpen(analyticsContext.flags.should_ask && !isPrivacyPage);
	}, [analyticsContext.flags.should_ask, pathname]);

	//
	// B. Handle actions

	const handleEnable = () => {
		analyticsContext.actions.enable();
		setIsOpen(false);
		analyticsContext.actions.capture('test');
	};

	const handleDisable = () => {
		analyticsContext.actions.disable();
		setIsOpen(false);
	};

	//
	// C. Render Components

	return (
		<Modal classNames={{ body: styles.bodyOverride, content: styles.contentOverride }} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setIsOpen(false)} opened={isOpen} overlayProps={{ backgroundOpacity: 0.55, blur: 3 }} returnFocus={true} trapFocus={false} withCloseButton={false}>
			<Logo />
			<h4 className={styles.title}>{t('title')}</h4>
			<h4 className={styles.text}>{t('text')}</h4>
			<Link className={styles.link} href="/legal/cookies" target="_blank">
				{t('privacy_policy')}
			</Link>
			<div className={styles.answersWrapper}>
				<Button className={styles.refuseButtonOverride} onClick={handleDisable} size="xs">
					{t('refuse')}
				</Button>
				<Button onClick={handleEnable} variant="primary">
					{t('accept')}
				</Button>
			</div>
		</Modal>
	);

	//
}
