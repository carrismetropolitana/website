'use client';

/* * */

import { Link } from '@/components/common/Link';
import { Logo } from '@/components/header/Logo';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useConsentContext } from '@/contexts/Consent.context';
import { Button, Checkbox, Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ConsentPopup() {
	//

	//
	// A. Setup variables

	const t = useTranslations('analytics.ConsentPopup');
	const pathname = usePathname();
	const consentContext = useConsentContext();
	const analyticsContext = useAnalyticsContext();

	const [showOptions, setShowOptions] = useState(false);
	const [optionAnalyticsDecision, setOptionAnalyticsDecision] = useState(true);
	const [optionFunctionalDecision, setOptionFunctionalDecision] = useState(true);

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	//
	// B. Handle actions

	useEffect(() => {
		// Return if consentContext is not ready
		if (!consentContext.data.init_status) return;
		// Return if pathname is not available
		if (!pathname) return;
		// Check if pathname is the cookies policy page
		const regexPatternToMatchCookiesPage = /^(\/[a-z]{2})?\/cookies\/?$/;
		const isCookiesPage = regexPatternToMatchCookiesPage.test(pathname);
		// Set the modal state based on the context and pathname
		setIsPopupOpen(consentContext.data.ask_for_consent && !isCookiesPage);
	}, [consentContext.data.init_status, consentContext.data.ask_for_consent, pathname]);

	const handleAccept = () => {
		// Set the Analytics decision based on the set option
		if (optionAnalyticsDecision) {
			consentContext.actions.enable(['analytics']);
			analyticsContext.actions.capture(ampli => ampli.acceptAnalyticsConsent());
		}
		else {
			consentContext.actions.disable(['analytics']);
		}
		// Set the Functional decision based on the set option
		if (optionFunctionalDecision) {
			consentContext.actions.enable(['functional']);
		}
		else {
			consentContext.actions.disable(['functional']);
		}
		// Dismiss and reset the popup
		setIsPopupOpen(false);
		setShowOptions(false);
		setOptionAnalyticsDecision(true);
		setOptionFunctionalDecision(true);
	};

	const handleRefuse = () => {
		consentContext.actions.disable(['analytics', 'functional']);
		setIsPopupOpen(false);
		setShowOptions(false);
		setOptionAnalyticsDecision(true);
		setOptionFunctionalDecision(true);
	};

	//
	// C. Render Components

	return (
		<Modal
			classNames={{ body: styles.bodyOverride, content: styles.contentOverride }}
			closeOnClickOutside={false}
			closeOnEscape={false}
			onClose={() => setIsPopupOpen(false)}
			opened={isPopupOpen}
			overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
			returnFocus={true}
			trapFocus={false}
			withCloseButton={false}
		>

			<Logo />
			<h4 className={styles.title}>{t('title')}</h4>
			<h4 className={styles.text}>{t('text')}</h4>

			<div className={styles.link} onClick={() => setShowOptions(prev => !prev)}>
				{showOptions ? t('actions.hide_options') : t('actions.show_options')}
			</div>

			{showOptions && (
				<>
					<Checkbox checked={optionFunctionalDecision} label={t('options.functional')} onChange={event => setOptionFunctionalDecision(event.currentTarget.checked)} size="sm" />
					<Checkbox checked={optionAnalyticsDecision} label={t('options.analytics')} onChange={event => setOptionAnalyticsDecision(event.currentTarget.checked)} size="sm" />
				</>
			)}

			<Link className={styles.link} href="/cookies" target="_blank">
				{t('policy_page')}
			</Link>

			<div className={styles.answersWrapper}>
				<Button className={styles.refuseButtonOverride} onClick={handleRefuse} size="xs">
					{t('actions.refuse')}
				</Button>
				<Button onClick={handleAccept} variant="primary">
					{optionAnalyticsDecision && optionFunctionalDecision ? t('actions.accept') : t('actions.save')}
				</Button>
			</div>

		</Modal>
	);

	//
}
