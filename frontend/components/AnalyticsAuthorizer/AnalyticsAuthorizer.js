'use client';

import styles from './AnalyticsAuthorizer.module.css';
import { Button, Modal } from '@mantine/core';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
    const regexPatternToMatchCookiesPolicy = /^(\/[a-z]{2})?\/legal\/cookies\/?$/;
    const isPrivacyPage = regexPatternToMatchCookiesPolicy.test(pathname);
    setIsOpen(!analyticsContext.enabled && !isPrivacyPage);
  }, [analyticsContext.enabled, pathname]);

  //
  // B. Render Components

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
  // B. Render Components

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
}
