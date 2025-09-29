'use client';

/* * */

import { SelectPattern } from '@/components/common/SelectPattern';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { IconArrowBarToRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export function SelectActivePatternGroup() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.SelectActivePatternGroup');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!linesDetailContext.data.valid_patterns) return [];
		return linesDetailContext.data.valid_patterns;
	}, [linesDetailContext.data.valid_patterns]);

	//
	// C. Render components

	if (!validPatternGroupsSelectOptions) {
		return null;
	}

	return (
		<SelectPattern
			leftSection={<IconArrowBarToRight size={20} />}
			onChange={linesDetailContext.actions.setActivePattern}
			patterns={validPatternGroupsSelectOptions}
			placeholder={t('placeholder')}
			value={linesDetailContext.data.active_pattern?.version_id || null}
			clearable
			searchable
		/>
	);

	//
}
