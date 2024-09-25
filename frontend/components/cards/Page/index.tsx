/* * */

import Discounts from '../Discounts';
import Modalities from '../Modalities';
import MunicipalDiscounts from '../MunicipalDiscounts';
import Pass from '../Pass';

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
