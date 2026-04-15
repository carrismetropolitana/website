'use client';
/* * */

import type { RenderNodeOptions } from './renderNode';
import type { LexicalNode } from '@/types/lexical-node.types';
import type { ReactNode } from 'react';

import { renderNode } from './renderNode';

/* * */

export function useRenderLexicalNode() {
	return (node: LexicalNode, key?: number, options?: RenderNodeOptions): ReactNode => renderNode(node, key, options);
}

/* * */
