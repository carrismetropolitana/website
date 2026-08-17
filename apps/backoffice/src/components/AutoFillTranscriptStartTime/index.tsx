'use client';

import { useField, useFormFields } from '@payloadcms/ui';
import { useEffect } from 'react';

interface Props {
	path: string
}

function getPreviousEndTimePath(path: string): string | undefined {
	const segments = path.split('.');
	const rowIndex = Number(segments.at(-2));

	if (!Number.isInteger(rowIndex) || rowIndex <= 0) return undefined;

	return [...segments.slice(0, -2), String(rowIndex - 1), 'endTime'].join('.');
}

export function AutoFillTranscriptStartTime({ path }: Props) {
	const previousEndTimePath = getPreviousEndTimePath(path);
	const previousEndTime = useFormFields(([fields]) => (
		previousEndTimePath ? fields[previousEndTimePath]?.value : undefined
	));
	const { setValue, value } = useField<number>({ path });

	useEffect(() => {
		if (typeof value === 'number' || typeof previousEndTime !== 'number') return;
		setValue(previousEndTime);
	}, [previousEndTime, setValue, value]);

	return null;
}
