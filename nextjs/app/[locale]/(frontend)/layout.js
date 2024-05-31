/* * */

import FrontendHeader from '@/components/FrontendHeader';
// import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
import FrontendViewportWrapper from '@/components/FrontendViewportWrapper';

/* * */

export default function Layout({ children }) {
	return (
		<FrontendViewportWrapper>
			<FrontendHeader />
			{children}
			{/* <FrontendFooter /> */}
		</FrontendViewportWrapper>
	);
}
