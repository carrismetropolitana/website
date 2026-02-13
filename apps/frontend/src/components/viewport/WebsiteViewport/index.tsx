'use client';

/* * */

import { ArrabidaHeader } from '@/components/arrabida/ArrabidaHeader';
import { ConsentPopup } from '@/components/common/ConsentPopup';
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { Footer } from '@/components/footer/Footer';
import { GeneralStatus } from '@/components/header/GeneralStatus';
import { Header } from '@/components/header/Header';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './styles.module.css';

/* * */

export function WebsiteViewport({ children }) {
	//

	//
	// A. Setup variables

	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Check if we're on the arrabida365 page
	const isArrabidaPage = pathname === '/arrabida365';

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{searchParams.get('origin') !== 'app' && (
				isArrabidaPage ? <ArrabidaHeader /> : <Header />
			)}
			<GeneralStatus />
			{children}
			{searchParams.get('origin') !== 'app' && <Footer />}
			{searchParams.get('origin') !== 'app' && <ConsentPopup />}
			<ScrollToTopButton showAfterHeight={350} />
		</div>
	);

	//
}
