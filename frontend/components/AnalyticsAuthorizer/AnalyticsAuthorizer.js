'use client';

/* * */

import Link from 'next/link';
import Image from 'next/image';
import styles from './AnalyticsAuthorizer.module.css';
import { Button, Modal } from '@mantine/core';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

/* * */

export default function AnalyticsAuthorizer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AnalyticsAuthorizer');
  const pathname = usePathname();
  const analyticsContext = useAnalyticsContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if analyticsContext and pathname are ready
    if (typeof analyticsContext.enabled !== 'boolean' || !pathname) return;
    // Check if pathname is the cookies policy page
    const regexPatternToMatchCookiesPolicy = /^(\/[a-z]{2})?\/legal\/cookies\/?$/;
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
    <Modal opened={isOpen} onClose={() => setIsOpen(false)} withCloseButton={false} trapFocus={false} closeOnEscape={false} closeOnClickOutside={false} returnFocus={true} overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}>
      <div className={styles.container}>
        <Image src="/images/analytics-header.svg" alt="" width={350} height={120} priority />
        <h4 className={styles.title}>{t('title')}</h4>
        <h4 className={styles.text}>{t('text')}</h4>
        <Link href="/legal/cookies" target="_blank" className={styles.link}>
          {t('privacy_policy')}
        </Link>
        <div className={styles.answers}>
          <Button onClick={handleEnable} className={styles.acceptButton} size="lg">
            {t('accept')}
          </Button>
          <Button onClick={handleDisable} className={styles.refuseButton} variant="subtle" size="xs">
            {t('refuse')}
          </Button>
        </div>
      </div>
    </Modal>
  );

  //
}
