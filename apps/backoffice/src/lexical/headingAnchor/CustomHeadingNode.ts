/* * */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DOMExportOutput, LexicalEditor, LexicalNode, NodeKey } from '@payloadcms/richtext-lexical/lexical';

import {
	HeadingNode,
	type HeadingTagType,
	type SerializedHeadingNode,
} from '@payloadcms/richtext-lexical/lexical/rich-text';

/* * */

type SerializedCustomHeadingNode = SerializedHeadingNode & {
	anchorId?: string
};

/* * */

export class CustomHeadingNode extends HeadingNode {
	__anchorId: string;

	constructor(tag: HeadingTagType, anchorId?: string, key?: NodeKey) {
		super(tag, key);
		this.__anchorId = anchorId || '';
	}

	static override clone(node: CustomHeadingNode): CustomHeadingNode {
		return new CustomHeadingNode(node.__tag, node.__anchorId, node.__key);
	}

	static override getType(): string {
		return 'custom-heading';
	}

	static override importJSON(json: any): CustomHeadingNode {
		const node = new CustomHeadingNode(json.tag, json.anchorId || '');
		node.setFormat(json.format);
		node.setIndent(json.indent);
		node.setDirection(json.direction);
		return node;
	}

	override createDOM(config: any): HTMLElement {
		const dom = super.createDOM(config);
		if (this.__anchorId) {
			dom.id = this.__anchorId;
		}
		return dom;
	}

	override exportDOM(editor: LexicalEditor): DOMExportOutput {
		const output = super.exportDOM(editor);
		if (output.element && this.__anchorId) {
			(output.element as HTMLElement).id = this.__anchorId;
		}
		return output;
	}

	override exportJSON(): SerializedCustomHeadingNode {
		return {
			...super.exportJSON(),
			anchorId: this.__anchorId || undefined,
			type: 'custom-heading' as any,
		};
	}

	getAnchorId(): string {
		return this.getLatest().__anchorId;
	}

	setAnchorId(anchorId: string): void {
		const writable = this.getWritable();
		writable.__anchorId = anchorId;
	}

	override updateDOM(prevNode: CustomHeadingNode, dom: HTMLElement): boolean {
		if (this.__tag !== prevNode.__tag) {
			return true;
		}
		const prevAnchor = prevNode.__anchorId || '';
		const currentAnchor = this.__anchorId || '';
		if (prevAnchor !== currentAnchor) {
			if (currentAnchor) {
				dom.id = currentAnchor;
			}
			else {
				dom.removeAttribute('id');
			}
		}
		return false;
	}
}

/* * */

export function $createCustomHeadingNode(tag: HeadingTagType, anchorId?: string): CustomHeadingNode {
	return new CustomHeadingNode(tag, anchorId);
}

/* * */

export function $isCustomHeadingNode(node: LexicalNode | null | undefined): node is CustomHeadingNode {
	return node instanceof CustomHeadingNode;
}

/* * */
