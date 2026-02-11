'use client';
/* * */

import type { HeadingAnchorFeatureProps } from './types';

import { openAnchorPopover } from '@/lexical/headingAnchor/anchorPopoverStore';
import { $isCustomHeadingNode, CustomHeadingNode } from '@/lexical/headingAnchor/CustomHeadingNode';
import { HeadingAnchorPlugin } from '@/lexical/headingAnchor/HeadingAnchorPlugin';
import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getNodeByKey, $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text';

/* * */

function $isHeadingNode(node: null | { getType?: () => string }): node is HeadingNode {
	return node != null && (node.getType?.() === 'heading' || node.getType?.() === 'custom-heading');
}

/* * */

function isInHeading(selection: ReturnType<typeof $getSelection>) {
	if (!$isRangeSelection(selection)) return false;
	const node = selection.anchor.getNode();
	return $isHeadingNode(node) || $isHeadingNode(node.getParent());
}

/* * */

function getHeadingKey(editor: { getEditorState: () => { read: (fn: () => void) => void } }): null | string {
	let key: null | string = null;
	editor.getEditorState().read(() => {
		const selection = $getSelection();
		if (!$isRangeSelection(selection)) return;
		const node = selection.anchor.getNode();
		const parent = node.getParent();
		if ($isHeadingNode(node)) key = node.getKey();
		else if (parent && $isHeadingNode(parent)) key = parent.getKey();
	});
	return key;
}

/* * */

const anchorToolbarGroup = {
	items: [
		{
			ChildComponent: () => <span style={{ fontSize: '14px', fontWeight: 700 }} title="Âncora">#</span>,
			isActive: ({ selection }: { selection: ReturnType<typeof $getSelection> }) => isInHeading(selection),
			isEnabled: ({ selection }: { selection: ReturnType<typeof $getSelection> }) => isInHeading(selection),
			key: 'headingAnchor',
			label: 'Âncora',
			onSelect: ({ editor }: { editor: { getEditorState: () => { read: (fn: () => void) => void }, update: (fn: () => void) => void } }) => {
				let key = getHeadingKey(editor);
				if (!key) return;
				editor.update(() => {
					const node = $getNodeByKey(key);
					if (node && $isHeadingNode(node) && !$isCustomHeadingNode(node)) {
						const custom = new CustomHeadingNode((node as HeadingNode).__tag);
						node.replace(custom, true);
						key = custom.getKey();
					}
				});
				openAnchorPopover(key);
			},
			order: 1,
		},
	],
	key: 'headingAnchor',
	order: 51,
	type: 'buttons' as const,
};

/* * */

export const HeadingAnchorFeatureClient = createClientFeature<
	HeadingAnchorFeatureProps,
	HeadingAnchorFeatureProps
>(() => ({
	nodes: [
		{ replace: HeadingNode, with: (node: HeadingNode) => new CustomHeadingNode(node.__tag), withKlass: CustomHeadingNode },
		CustomHeadingNode,
	],
	plugins: [{ Component: HeadingAnchorPlugin, position: 'normal' }],
	toolbarFixed: { groups: [anchorToolbarGroup] },
	toolbarInline: { groups: [anchorToolbarGroup] },
}));

/* * */
