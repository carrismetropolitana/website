'use client';
/* * */

import { createClientFeature, toolbarFormatGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection';

import styles from './style.module.css';
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
				className={styles.toolbarIcon}
				style={{ backgroundColor: color ?? 'transparent' }}
			/>
		</div>
	);
}

/* * */

export const BackgroundColorFeatureClient = createClientFeature(() => {
	const items = PRESET_COLORS.map(({ key, label, value }, index) => ({
		ChildComponent: () => <BackgroundColorIcon color={value} />,
		isActive: () => false,
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
		order: 10 + index,
	}));

	const groups = [toolbarFormatGroupWithItems(items)];
	return {
		toolbarFixed: { groups },
		toolbarInline: { groups },
	};
});
