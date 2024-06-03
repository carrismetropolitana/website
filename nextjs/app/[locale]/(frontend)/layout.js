/* * */

import FrontendFooter from '@/components/FrontendFooter';
import FrontendHeader from '@/components/FrontendHeader';
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
