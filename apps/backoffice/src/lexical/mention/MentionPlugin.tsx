'use client';
/* * */

import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

import { MentionTypeaheadPlugin } from './MentionTypeaheadPlugin';
import { registerMentionTransform } from './registerTransform';

/* * */
export function MentionPlugin() {
	//

	//
	// A. Setup Variables

	const [editor] = useLexicalComposerContext();

	//
	// B. Transform Data

	useEffect(() => {
		return registerMentionTransform(editor);
	}, [editor]);

	//
	// C. Render Components

	return <MentionTypeaheadPlugin />;

	//
}
