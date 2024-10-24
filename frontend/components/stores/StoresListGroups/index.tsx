'use client';

/* * */

import type { StoreGroupByMunicipality } from '@/types/stores.types';

import GroupedListItem from '@/components/layout/GroupedListItem';
import GroupedListSkeleton from '@/components/layout/GroupedListSkeleton';
import StoresListEmpty from '@/components/stores/StoresListEmpty';
import StoresListGroupItem from '@/components/stores/StoresListGroupItem';
import StoresListItemSkeleton from '@/components/stores/StoresListGroupItemSkeleton';
import { useStoresListContext } from '@/contexts/StoresList.context';
// import collator from '@/utils/collator';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListGroups');
	const storesListContext = useStoresListContext();

	//
	// B. Transform data

	const allStoresGroupedByMunicipality = useMemo(() => {
		//
		if (!storesListContext.data) return [];
		//
		const groupedStores: StoreGroupByMunicipality[] = storesListContext.data.filtered.reduce((result: StoreGroupByMunicipality[], item) => {
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
		// const sortedGroups = groupedStores.sort((a, b) => collator.compare(a.municipality_name, b.municipality_name));
		//
		return groupedStores;
		//
	}, [storesListContext.data]);

	//
	// C. Handle actions

	const handleSelectStore = (storeId: string) => {
		storesListContext.actions.updateSelectedStore(storeId);
	};

	//
	// D. Render components

	if (storesListContext.flags.is_loading) {
		return <GroupedListSkeleton groupCount={3} itemCount={2} itemSkeleton={<StoresListItemSkeleton />} />;
	}

	if (allStoresGroupedByMunicipality.length > 0 && storesListContext.filters.order_by === 'municipality_name') {
		return allStoresGroupedByMunicipality.map(storeGroup => (
			<GroupedListItem key={storeGroup.municipality_id} label={t('group_label')} title={storeGroup.municipality_name}>
				{storeGroup.stores.map(store => (
					<StoresListGroupItem key={store.id} isSelected={storesListContext.data.selected?.id === store.id} onSelect={handleSelectStore} storeData={store} />
				))}
			</GroupedListItem>
		));
	}

	if (storesListContext.data.filtered.length > 0) {
		return storesListContext.data.filtered.map(store => (
			<StoresListGroupItem key={store.id} isSelected={storesListContext.data.selected?.id === store.id} onSelect={handleSelectStore} storeData={store} />
		));
	}

	return <StoresListEmpty />;

	//
}
