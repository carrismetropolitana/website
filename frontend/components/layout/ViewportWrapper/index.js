'use client';

/* * */

import AnalyticsConsentPopup from '@/components/analytics/ConsentPopup';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { useSearchParams } from 'next/navigation';

import styles from './styles.module.css';

/* * */

export default function Component({ children }) {
	const searchParams = useSearchParams();
	let hasHeader = true;
	const originParam = searchParams.get('origin');
	if (originParam && (originParam === 'app' || originParam === 'mupi')) {
		hasHeader = false;
	}

	return (
		<div className={styles.container}>
			{hasHeader && <Header />}
			{children}
			{hasHeader && <Footer />}
			{hasHeader && <AnalyticsConsentPopup />}
		</div>
	);
}
