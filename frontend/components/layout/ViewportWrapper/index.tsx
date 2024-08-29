'use client';

/* * */

import AnalyticsConsentPopup from '@/components/analytics/ConsentPopup';
import DebugColorPicker from '@/components/common/DebugColorPicker';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { useDebugContext } from '@/contexts/Debug.context';
import { ColorPicker } from '@mantine/core';
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
	const debug = useDebugContext();

	return (
		<div className={styles.container}>
			{hasHeader && <Header />}
			{children}
			{hasHeader && <Footer />}
			{hasHeader && <AnalyticsConsentPopup />}
			{debug.flags.is_debug_mode && <DebugColorPicker />}
		</div>
	);
}
