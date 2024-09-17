'use client';

/* * */

import AnalyticsConsentPopup from '@/components/analytics/ConsentPopup';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { useSearchParams } from 'next/navigation';

import styles from './styles.module.css';

/* * */

export default function Component({ children }) {
	//

	//
	// A. Setup variables

	const searchParams = useSearchParams();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{searchParams.get('origin') !== 'app' && <Header />}
			{children}
			{searchParams.get('origin') !== 'app' && <Footer />}
			{searchParams.get('origin') !== 'app' && <AnalyticsConsentPopup />}
		</div>
	);

	//
}