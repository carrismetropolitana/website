'use client';

import { MentionPlugin } from '@/lexical/mentions/MentionPlugin';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';

export default function RichTextWithMentions() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		console.log('RichTextWithMentions mounted');
	}, [editor]);
	return (
		<>
			<MentionPlugin />
		</>
	);
}
