/* * */

import FrontendHeader from '@/components/_frontend/header/Header';
import FrontendFooter from '@/components/FrontendFooter';
import FrontendViewportWrapper from '@/components/FrontendViewportWrapper';

/* * */

export default function Layout({ children }) {
	return (
		<FrontendViewportWrapper>
			<FrontendHeader />
			{children}
			<FrontendFooter />
		</FrontendViewportWrapper>
	);
}
