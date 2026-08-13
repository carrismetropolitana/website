'use client';
/* * */
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';
import { $createTextNode, $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { LexicalTypeaheadMenuPlugin, MenuOption, type MenuRenderFn, type TriggerFn } from '@payloadcms/richtext-lexical/lexical/react/LexicalTypeaheadMenuPlugin';
import { type HubLine } from '@tmlmobilidade/go-types-public-info';
import React, { useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';

import { $createMentionNode } from './MentionNode';

/* * */

const MAX_RESULTS = 50;
const TRIGGER = 'line:';
const MAX_QUERY_LENGTH = 50;

/* * */

class MentionOption extends MenuOption {
	line: HubLine;
	constructor(line: HubLine) {
		super(line._id);
		this.line = line;
	}
}

function getOptionLabel(line: HubLine) {
	return line.short_name || line._id;
}

export function MentionTypeaheadPlugin() {
	//

	//
	// A. Setup Variables

	const linesContext = useLinesContext();
	const [editor] = useLexicalComposerContext();
	const [queryString, setQueryString] = useState<null | string>(null);

	//
	// B. Transform Data

	const options = useMemo(() => {
		const q = (queryString ?? '').trim().toLowerCase();
		if (!q) return linesContext.data.lines.slice(0, MAX_RESULTS).map(line => new MentionOption(line));

		const filtered = linesContext.data.lines.filter((line) => {
			const short = (line.short_name || '').toLowerCase();
			const long = (line.long_name || '').toLowerCase();
			const id = (line._id || '').toLowerCase();
			return short.includes(q) || long.includes(q) || id.includes(q);
		});

		return filtered.slice(0, MAX_RESULTS).map(line => new MentionOption(line));
	}, [linesContext.data.lines, queryString]);

	//
	// C. Handle Actions

	const triggerFn: TriggerFn = (text) => {
		const idx = text.lastIndexOf(TRIGGER);
		if (idx === -1) return null;

		if (idx > 0 && !/\s/.test(text[idx - 1])) return null;

		const matchingString = text.slice(idx + TRIGGER.length);

		if (/\s/.test(matchingString)) return null;
		if (matchingString.length > MAX_QUERY_LENGTH) return null;

		return { leadOffset: idx, matchingString, replaceableString: TRIGGER + matchingString };
	};

	//
	// D. Render Component

	const menuRenderFn: MenuRenderFn<MentionOption> = (anchorElementRef, { options, selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }) => {
		if (!anchorElementRef.current || options.length === 0) return null;

		return ReactDOM.createPortal(
			<div aria-label="Mentions" className="mention-typeahead" role="listbox">
				{options.map((option, i) => {
					const isSelected = selectedIndex === i;

					return (
						<button
							key={option.key}
							ref={el => option.setRefElement(el)}
							aria-selected={isSelected}
							className={['mention-typeahead__item', isSelected ? 'mention-typeahead__item--selected' : null].filter(Boolean).join(' ')}
							onMouseEnter={() => setHighlightedIndex(i)}
							role="option"
							type="button"
							onMouseDown={(e) => {
								e.preventDefault();
								setHighlightedIndex(i);
								selectOptionAndCleanUp(option);
							}}
						>
							<span className="mention-typeahead__label">
								<LineDisplay lineData={option.line} size="md" />
							</span>
						</button>
					);
				})}
			</div>,
			anchorElementRef.current,
		);
	};

	return (
		<LexicalTypeaheadMenuPlugin<MentionOption>
			menuRenderFn={menuRenderFn}
			onQueryChange={setQueryString}
			options={options}
			triggerFn={triggerFn}
			onSelectOption={(option, textNodeContainingQuery, closeMenu, matchingString) => {
				closeMenu();

				if (!textNodeContainingQuery) return;

				editor.update(() => {
					const selection = $getSelection();

					if (!$isRangeSelection(selection)) return;

					const cursorOffset = selection.anchor.offset;
					const text = textNodeContainingQuery.getTextContent();
					const start = text.lastIndexOf(TRIGGER, Math.max(0, cursorOffset - 1));

					if (start === -1) return;

					const end = start + TRIGGER.length + matchingString.length;
					if (end > text.length) return;

					const parts = textNodeContainingQuery.splitText(start, end);
					const mentionTextNode = parts.find(n => n.getTextContent().startsWith(TRIGGER));
					if (!mentionTextNode) return;

					const label = getOptionLabel(option.line);
					const mentionNode = $createMentionNode(option.line._id, label);

					mentionTextNode.replace(mentionNode);
					mentionNode.insertAfter($createTextNode(' '));
				});
			}}
		/>
	);
}
