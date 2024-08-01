'use client';

/* * */

import ButtonDefault from '@/components/common/ButtonDefault';
import GroupedListItem from '@/components/layout/GroupedListItem';
import Section from '@/components/layout/Section';
import { IconPhoneCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('StoresPage');

	//
	// B. Fetch data

	const { data: allStoresData } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/encm');

	//
	// C. Render components

	const allStoresGroupedByMunicipality = useMemo(() => {
		//
		if (!allStoresData) return [];
		//
		const groupedEncm = allStoresData.reduce((result, item) => {
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
		}, []);
		const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
		const sortedGroups = groupedEncm.sort((a, b) => collator.compare(a.municipality_name, b.municipality_name));
		return sortedGroups;
	}, [allStoresData]);

	//
	// C. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<ButtonDefault icon={<IconPhoneCheck size={18} />} label={t('external_link')} onClick={() => window.open('https://www.navegante.pt/navegante/espacos-pontos-navegante', '_blank')} />
			</Section>
			<Section withTopPadding>
				{allStoresGroupedByMunicipality.map(storeGroup => (
					<GroupedListItem key={storeGroup.municipality_id} label={t('grouped_list.label')} title={storeGroup.municipality_name}>
						{storeGroup.stores.map(store => (
							<div>{store.name}</div>
						))}
					</GroupedListItem>
				))}
			</Section>
		</>
	);

	//
}
