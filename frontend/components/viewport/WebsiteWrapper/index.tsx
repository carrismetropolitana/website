/* * */

import AnalyticsConsentPopup from '@/components/analytics/ConsentPopup';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

import styles from './styles.module.css';

/* * */

export default function Component({ children }) {
	return (
		<div className={styles.container}>
			<Header />
			{children}
			<Footer />
			<AnalyticsConsentPopup />
		</div>
	);
}
