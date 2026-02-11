'use client';
/* * */

import type { HeadingAnchorFeatureProps } from './types';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getNodeByKey, $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text';

import { openAnchorPopover } from './anchorPopoverStore';
import { $isCustomHeadingNode, CustomHeadingNode } from './CustomHeadingNode';
import { HeadingAnchorPlugin } from './HeadingAnchorPlugin';

function $isHeadingNode(node: null | { getType?: () => string }): node is HeadingNode {
	return node != null && (node.getType?.() === 'heading' || node.getType?.() === 'custom-heading');
}

/* * */

function AnchorIcon() {
	return (
		<span style={{ fontSize: '14px', fontWeight: 700 }} title="Âncora">
			#
		</span>
	);
}

function getHeadingKeyFromSelection(editor: { getEditorState: () => { read: (fn: () => void) => void } }): null | string {
	let key: null | string = null;
	editor.getEditorState().read(() => {
		const selection = $getSelection();
		if (!$isRangeSelection(selection)) return;
		const node = selection.anchor.getNode();
		if ($isHeadingNode(node)) {
			key = node.getKey();
			return;
		}
		const parent = node.getParent();
		if (parent && $isHeadingNode(parent)) key = parent.getKey();
	});
	return key;
}

const anchorToolbarGroup = {
	items: [
		{
			ChildComponent: AnchorIcon,
			isActive: ({ selection }) => {
				if (!$isRangeSelection(selection)) return false;
				const node = selection.anchor.getNode();
				if ($isHeadingNode(node)) return true;
				const parent = node.getParent();
				return Boolean(parent && $isHeadingNode(parent));
			},
			isEnabled: ({ selection }) => {
				if (!$isRangeSelection(selection)) return false;
				const node = selection.anchor.getNode();
				if ($isHeadingNode(node)) return true;
				const parent = node.getParent();
				return Boolean(parent && $isHeadingNode(parent));
			},
			key: 'headingAnchor',
			label: 'Âncora',
			onSelect: ({ editor }) => {
				let keyToOpen = getHeadingKeyFromSelection(editor);
				if (!keyToOpen) return;
				editor.update(() => {
					const node = $getNodeByKey(keyToOpen);
					if (node && $isHeadingNode(node) && !$isCustomHeadingNode(node)) {
						const tag = (node as HeadingNode).__tag;
						const custom = new CustomHeadingNode(tag);
						node.replace(custom, true);
						keyToOpen = custom.getKey();
					}
				});
				openAnchorPopover(keyToOpen);
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
		{
			replace: HeadingNode,
			with: (node: HeadingNode) => new CustomHeadingNode(node.__tag),
			withKlass: CustomHeadingNode,
		},
		CustomHeadingNode,
	],
	plugins: [
		{
			Component: HeadingAnchorPlugin,
			position: 'normal',
		},
	],
	toolbarFixed: {
		groups: [anchorToolbarGroup],
	},
	toolbarInline: {
		groups: [anchorToolbarGroup],
	},
}));

/* * */
