'use client';
/* * */

import type { LexicalNode } from '@/types/lexical-node.types';
import type { ReactNode } from 'react';

import { renderNode } from './renderNode';

/* * */

export function useRenderLexicalNode() {
	return (node: LexicalNode, key?: number): ReactNode => renderNode(node, key);
}

/* * */

