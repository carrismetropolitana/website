/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from 'react';

import { DecoratorNode, type LexicalNode, type NodeKey } from '@payloadcms/richtext-lexical/lexical';

export class MentionNode extends DecoratorNode<JSX.Element> {
	__id: string;
	__label: string;

	constructor(id: string, label: string, key?: NodeKey) {
		super(key);
		this.__id = id;
		this.__label = label;
	}

	static override clone(node: MentionNode) {
		return new MentionNode(node.__id, node.__label, node.__key);
	}

	static override getType() {
		return 'mention';
	}

	static override importJSON(serialized: any) {
		return new MentionNode(serialized.id, serialized.label);
	}

	override createDOM() {
		const span = document.createElement('span');
		span.className = 'mention';
		return span;
	}

	override decorate() {
		return (
			<span className="mention" data-line-id={this.__id}>
				@{this.__label}
			</span>
		);
	}

	override exportJSON() {
		return {
			id: this.__id,
			label: this.__label,
			type: 'mention',
			version: 1,
		};
	}

	override isInline() {
		return true;
	}

	override updateDOM() {
		return false;
	}
}

export function $createMentionNode(id: string, label: string) {
	return new MentionNode(id, label);
}

export function $isMentionNode(node: LexicalNode): node is MentionNode {
	return node instanceof MentionNode;
}
