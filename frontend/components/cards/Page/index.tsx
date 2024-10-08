/* * */

import { Discounts } from '@/components/cards/Discounts';
import { Modalities } from '@/components/cards/Modalities';
import { MunicipalDiscounts } from '@/components/cards/MunicipalDiscounts';
import { Pass } from '@/components/cards/Pass';

/* * */

export default function Component() {
	return (
		<>
			<Pass />
			<Modalities />
			<Discounts />
			<MunicipalDiscounts />
		</>
	);
}
