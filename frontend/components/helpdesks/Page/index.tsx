/* * */

import { Service } from '@/components/helpdesks/Service';
// import { ServicePoints } from '@/components/helpdesks/ServicePoints';
import { WhereToBuy } from '@/components/helpdesks/WhereToBuy';

/* * */

export default function Component() {
	return (
		<>
			<WhereToBuy />
			<Service />
			{/* <ServicePoints /> */}
		</>
	);
}
