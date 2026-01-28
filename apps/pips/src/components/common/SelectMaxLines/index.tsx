'use client';

/* * */

import { NumberInput } from '@mantine/core';
import { IconArrowLoopRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

interface Props {
	label?: string
	maxLines: number | string
	onChangeMaxLines: (maxLines: number) => void
}

/* * */

export function SelectMaxLines({ label, maxLines, onChangeMaxLines }: Props) {
	//

	//
	// A. Setup variables
	const t = useTranslations('Pips');

	//
	// B. Render components

	return (
		<NumberInput
			autoComplete="off"
			label={label || t('max_lines')}
			leftSection={<IconArrowLoopRight size={20} />}
			min={0}
			onChange={onChangeMaxLines}
			placeholder={t('max_lines')}
			size="md"
			value={maxLines}
		/>
	);

	//
}
