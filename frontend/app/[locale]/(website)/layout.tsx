/* * */

import LayoutViewportWrapper from '@/components/layout/ViewportWrapper';

/* * */

export default function Layout({ children }) {
	return (
		<LayoutViewportWrapper>
			{children}
		</LayoutViewportWrapper>
	);
}
