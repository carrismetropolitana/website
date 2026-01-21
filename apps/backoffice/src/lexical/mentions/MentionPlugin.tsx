'use client';

import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

import { registerMentionTransform } from './registerTransform';

export function MentionPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		return registerMentionTransform(editor);
	}, [editor]);

	return null;
}

export default MentionPlugin;
