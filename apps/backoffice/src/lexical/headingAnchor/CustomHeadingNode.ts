/* * */

import type { LexicalEditor, LexicalNode, NodeKey } from '@payloadcms/richtext-lexical/lexical';

import { HeadingNode, type HeadingTagType, type SerializedHeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text';

/* * */

type SerializedCustomHeadingNode = SerializedHeadingNode & { anchorId?: string };

/* * */

export class CustomHeadingNode extends HeadingNode {
	__anchorId: string;

	constructor(tag: HeadingTagType, anchorId?: string, key?: NodeKey) {
		super(tag, key);
		this.__anchorId = anchorId ?? '';
	}

	static override clone(node: CustomHeadingNode) {
		return new CustomHeadingNode(node.__tag, node.__anchorId, node.__key);
	}

	static override getType() {
		return 'custom-heading';
	}

	static override importJSON(json: SerializedCustomHeadingNode) {
		const node = new CustomHeadingNode(json.tag, json.anchorId ?? '');
		node.setFormat(json.format);
		node.setIndent(json.indent);
		node.setDirection(json.direction);
		return node;
	}

	override createDOM(config: Parameters<HeadingNode['createDOM']>[0]) {
		const dom = super.createDOM(config);
		if (this.__anchorId) dom.id = this.__anchorId;
		return dom;
	}

	override exportDOM(editor: LexicalEditor) {
		const output = super.exportDOM(editor);
		if (output.element && this.__anchorId) (output.element as HTMLElement).id = this.__anchorId;
		return output;
	}

	override exportJSON(): SerializedCustomHeadingNode {
		return { ...super.exportJSON(), anchorId: this.__anchorId || undefined, type: 'custom-heading' };
	}

	getAnchorId() {
		return this.getLatest().__anchorId;
	}

	setAnchorId(anchorId: string) {
		this.getWritable().__anchorId = anchorId;
	}

	override updateDOM(prevNode: CustomHeadingNode, dom: HTMLElement) {
		if (this.__tag !== prevNode.__tag) return true;
		const cur = this.__anchorId ?? '';
		const prev = prevNode.__anchorId ?? '';
		if (prev !== cur) {
			if (cur) dom.id = cur;
			else dom.removeAttribute('id');
		}
		return false;
	}
}

/* * */

export const $createCustomHeadingNode = (tag: HeadingTagType, anchorId?: string) => new CustomHeadingNode(tag, anchorId);

/* * */

export const $isCustomHeadingNode = (node: LexicalNode | null | undefined): node is CustomHeadingNode => node instanceof CustomHeadingNode;

/* * */
