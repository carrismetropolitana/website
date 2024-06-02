/* * */

import FrontendHomepageCarousel from '@/components/FrontendHomepageCarousel';
import FrontendHomepageNews from '@/components/FrontendHomepageNews';
import FrontendHomepageSupport from '@/components/FrontendHomepageSupport';
import FrontendHomepageTravel from '@/components/FrontendHomepageTravel';

/* * */

export default function Component() {
	return (
		<>
			{/* <FrontendHomepageCarousel /> */}
			<FrontendHomepageTravel />
			<FrontendHomepageNews />
			<FrontendHomepageSupport />
		</>
	);
}
