'use client';
/* * */

import { createClientFeature, toolbarFormatGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection';

/* * */

const PRESET_COLORS = [
	{ key: 'bg-yellow', label: 'Amarelo', value: '#ffdd01' },
	{ key: 'bg-lightblue', label: 'Azul claro', value: '#add8e6' },
	{ key: 'bg-green', label: 'Verde', value: '#90ee90' },
	{ key: 'bg-orange', label: 'Laranja', value: '#ffcc80' },
	{ key: 'bg-pink', label: 'Rosa', value: '#ffb6c1' },
	{ key: 'bg-clear', label: 'Sem cor', value: null },
] as const;

/* * */

function BackgroundColorIcon({ color }: { color?: null | string }) {
	return (
		<div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', padding: 4 }}>
			<div
				style={{
					backgroundColor: color ?? 'transparent',
					border: '1px solid var(--theme-elevation-250)',
					borderRadius: 2,
					height: 12,
					width: 16,
				}}
			/>
		</div>
	);
}

/* * */

export const BackgroundColorFeatureClient = createClientFeature(() => {
	const items = PRESET_COLORS.map(({ key, label, value }) => ({
		ChildComponent: () => <BackgroundColorIcon color={value} />,
		isActive: ({ selection }) => {
			if (!$isRangeSelection(selection)) return false;
			return false;
		},
		key,
		label,
		onSelect: ({ editor }) => {
			editor.update(() => {
				const selection = $getSelection();
				if (!$isRangeSelection(selection)) return;
				$patchStyleText(selection, {
					'background-color': value ?? null,
					'color': value ? '#000000' : null,
				});
			});
		},
		order: 10 + PRESET_COLORS.findIndex(c => c.key === key),
	}));

	return {
		toolbarFixed: {
			groups: [toolbarFormatGroupWithItems(items)],
		},
		toolbarInline: {
			groups: [toolbarFormatGroupWithItems(items)],
		},
	};
});
