/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendPlanner from '@/components/FrontendPlanner/FrontendPlanner';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch line data

	// B. Render the titles
	switch (params.locale) {
		case 'pt':
			return { title: 'Planeador de viagens', description: 'Planeie as suas viagens' };
		default:
		case 'en':
			return { title: 'Travel planner', description: 'Plan your trips' };
	}

	//
}

/* * */

export default function Page({ params }) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendPlanner />
		</OneFullColumn>
	);

	//
}