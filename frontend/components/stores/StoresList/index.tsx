'use client';

/* * */

import type { StoreGroupByMunicipality } from '@/types/stores.types';

import GroupedListItem from '@/components/layout/GroupedListItem';
import GroupedListSkeleton from '@/components/layout/GroupedListSkeleton';
import StoresListEmpty from '@/components/stores/StoresListEmpty';
import StoreListItem from '@/components/stores/StoresListItem';
import StoresListItemSkeleton from '@/components/stores/StoresListItemSkeleton';
import { useStoresListContext } from '@/contexts/StoresList.context';
import collator from '@/utils/collator';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresList');
	const storesContext = useStoresListContext();

	//
	// B. Transform data

	const allStoresGroupedByMunicipality = useMemo(() => {
		//
		if (!storesContext.data) return [];
		//
		const groupedStores: StoreGroupByMunicipality[] = storesContext.data.filtered.reduce((result: StoreGroupByMunicipality[], item) => {
			const existingGroup = result.find(group => group.municipality_id === item.municipality_id);
			if (existingGroup) {
				existingGroup.stores.push(item);
			}
			else {
				result.push({
					municipality_id: item.municipality_id,
					municipality_name: item.municipality_name,
					stores: [item],
				});
			}
			return result;
		}, []) || [];
		//
		const sortedGroups = groupedStores.sort((a, b) => collator.compare(a.municipality_name, b.municipality_name));
		//
		return sortedGroups;
		//
	}, [storesContext.data]);

	//
	// C. Render components

	if (storesContext.flags.is_loading) {
		return <GroupedListSkeleton groupCount={3} itemCount={2} itemSkeleton={<StoresListItemSkeleton />} />;
	}

	if (allStoresGroupedByMunicipality.length > 0) {
		return (
			allStoresGroupedByMunicipality.map(storeGroup => (
				<GroupedListItem key={storeGroup.municipality_id} label={t('label')} title={storeGroup.municipality_name}>
					{storeGroup.stores.map(store => (
						<StoreListItem key={store.id} data={store} />
					))}
				</GroupedListItem>
			))
		);
	}

	return <StoresListEmpty />;

	//
}
