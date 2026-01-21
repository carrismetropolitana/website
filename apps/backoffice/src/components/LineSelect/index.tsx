'use client';

/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { useLinesContext } from '@/contexts/Lines.context';
import { useMemo } from 'react';

/* * */

interface Props {
	className?: string
	disabled?: boolean
	id?: string
	name?: string
	onChange?: (lineId: null | string, line?: Line) => void
	placeholder?: string
	sort?: 'none' | 'short_name'
	value?: null | string
}

/* * */

export const LineSelect = ({ className, disabled = false, id, name, onChange, placeholder = 'Selecionar linha…', sort = 'short_name', value = null }: Props) => {
	//

	const linesContext = useLinesContext();
	const isLoading = linesContext.flags.is_loading;

	const linesPrepared = useMemo(() => {
		const lines = linesContext.data.lines;
		if (sort === 'none') return lines;
		return [...lines].sort((a, b) => (a.short_name || '').localeCompare(b.short_name || ''));
	}, [linesContext.data.lines, sort]);

	return (
		<select
			className={className}
			disabled={disabled || isLoading}
			id={id}
			name={name}
			value={value || ''}
			onChange={(event) => {
				const nextValue = event.target.value || null;
				const nextLine = nextValue ? linesContext.actions.getLineDataById(nextValue) : undefined;
				onChange?.(nextValue, nextLine);
			}}
		>
			<option value="">
				{isLoading ? 'A carregar linhas…' : placeholder}
			</option>
			{linesPrepared.map(line => (
				<option key={line.id} value={line.id}>
					{line.long_name ? `${line.short_name} — ${line.long_name}` : (line.short_name || line.id)}
				</option>
			))}
		</select>
	);
};
