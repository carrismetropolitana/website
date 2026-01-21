'use client';

/* * */

import { LineSelect } from '@/components/LineSelect';
import { useField } from '@payloadcms/ui';

/* * */

interface Props {
	field?: {
		label?: string
		required?: boolean
	}
	path: string
	readOnly?: boolean
}

/* * */

/* * */

export function LineSelectField({ field, path, readOnly }: Props) {
	const { setValue, value } = useField<string>({ path });

	const id = `field-${path.replaceAll('.', '__')}`;
	const label = field?.label || 'Linha';

	const selectedValue = typeof value === 'string' && value.length > 0 ? value : null;

	return (
		<div className="field-type">
			<label className="field-label" htmlFor={id}>
				{label}
				{field?.required ? ' *' : ''}
			</label>
			<LineSelect
				disabled={!!readOnly}
				id={id}
				onChange={lineId => setValue(lineId || '')}
				value={selectedValue}
			/>
		</div>
	);
}
