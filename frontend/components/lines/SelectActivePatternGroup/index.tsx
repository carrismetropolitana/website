'use client';

/* * */

import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { Select } from '@mantine/core';
import { IconArrowBarToRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.SelectActivePatternGroup');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!linesDetailContext.data.valid_pattern_groups) return [];
		return linesDetailContext.data.valid_pattern_groups.map(patternGroupData => ({ label: patternGroupData.headsign || '-', value: patternGroupData.pattern_group_id }));
	}, [linesDetailContext.data.valid_pattern_groups]);

	//
	// C. Render components

	return (
		<Select
			data={validPatternGroupsSelectOptions}
			leftSection={<IconArrowBarToRight size={20} />}
			onChange={linesDetailContext.actions.setActivePatternGroup}
			placeholder={t('placeholder')}
			value={linesDetailContext.data.active_pattern_group?.pattern_group_id || null}
			clearable
			searchable
		/>
	);

	//
}
