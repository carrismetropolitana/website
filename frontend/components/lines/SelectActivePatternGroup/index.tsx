'use client';

/* * */

import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { Select } from '@mantine/core';
import { IconArrowBarToRight, IconZoomQuestionFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.SelectActivePatternGroup');
	const linesSingleContext = useLinesSingleContext();

	//
	// B. Transform data

	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!linesSingleContext.data.valid_pattern_groups) return [];
		return linesSingleContext.data.valid_pattern_groups.map(patternGroupData => ({ label: patternGroupData.headsign || '-', value: patternGroupData.pattern_group_id }));
	}, [linesSingleContext.data.valid_pattern_groups]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.explainer}>
				<IconZoomQuestionFilled size={16} />
				{t('explainer')}
			</div>
			<Select
				data={validPatternGroupsSelectOptions}
				leftSection={<IconArrowBarToRight size={20} />}
				onChange={linesSingleContext.actions.setActivePatternGroup}
				placeholder={t('placeholder')}
				value={linesSingleContext.data.active_pattern_group?.pattern_group_id || null}
				clearable
				searchable
			/>
		</div>
	);

	//
}
