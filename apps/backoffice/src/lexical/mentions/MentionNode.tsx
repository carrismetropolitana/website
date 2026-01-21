/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX } from 'react';

import { DecoratorNode, type LexicalNode, type NodeKey } from '@payloadcms/richtext-lexical/lexical';
import React, { lazy, Suspense } from 'react';

const LazyLineBadge = lazy(async () => {
	const mod = await import('@/components/LineBadge/index');
	return { default: mod.LineBadge };
});

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
		const href = `https://carrismetropolitana.pt/lines/${this.__id}`;
		return (
			<span className="mention" data-line-id={this.__id}>
				<Suspense fallback={(
					<a className="mention__link" href={href} rel="noreferrer noopener" target="_blank">
						<span className="mention">line:{this.__label}</span>
					</a>
				)}
				>
					<a className="mention__link" href={href} rel="noreferrer noopener" target="_blank">
						<LazyLineBadge as="span" lineId={this.__id} size="md" />
					</a>
				</Suspense>
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
