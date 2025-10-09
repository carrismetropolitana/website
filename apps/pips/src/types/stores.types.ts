/* * */

import { Store } from '@carrismetropolitana/api-types/facilities';

/* * */

export interface StoreGroupByMunicipality {
	municipality_id: string
	municipality_name: string
	stores: Store[]
}
