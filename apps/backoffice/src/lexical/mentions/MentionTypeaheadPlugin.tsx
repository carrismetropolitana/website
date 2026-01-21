'use client';
/* * */
import type { Line } from '@carrismetropolitana/api-types/network';

import { useLinesContext } from '@/contexts/Lines.context';
import { $createTextNode, $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { LexicalTypeaheadMenuPlugin, MenuOption, type MenuRenderFn, type TriggerFn } from '@payloadcms/richtext-lexical/lexical/react/LexicalTypeaheadMenuPlugin';
import React, { useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';

import { $createMentionNode } from './MentionNode';

/* * */

const MAX_RESULTS = 8;
const TRIGGER = 'line:';
const MAX_QUERY_LENGTH = 50;

/* * */

class MentionOption extends MenuOption {
	line: Line;
	constructor(line: Line) {
		super(line.id);
		this.line = line;
	}
}

function getOptionLabel(line: Line) {
	return line.short_name || line.id;
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
			const id = (line.id || '').toLowerCase();
			return short.includes(q) || long.includes(q) || id.includes(q);
		});

		return filtered.slice(0, MAX_RESULTS).map(line => new MentionOption(line));
	}, [linesContext.data.lines, queryString]);

	//
	// C. Handle Actions

	// Lexical's built-in `useBasicTypeaheadTriggerMatch` is intended for 1-char triggers (like '@').
	// For multi-char triggers like 'line:', we implement our own trigger matcher.
	const triggerFn: TriggerFn = (text) => {
		const idx = text.lastIndexOf(TRIGGER);
		if (idx === -1) return null;

		if (idx > 0 && !/\s/.test(text[idx - 1])) return null;

		const matchingString = text.slice(idx + TRIGGER.length);

		if (/\s/.test(matchingString)) return null;
		if (matchingString.length > MAX_QUERY_LENGTH) return null;

		return {
			leadOffset: idx,
			matchingString,
			replaceableString: TRIGGER + matchingString,
		};
	};
	//
	// D. Render Component

	const menuRenderFn: MenuRenderFn<MentionOption> = (anchorElementRef, { options, selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }, matchingString) => {
		if (!anchorElementRef.current || options.length === 0) return null;

		return ReactDOM.createPortal(
			<div aria-label="Mentions" className="mention-typeahead" role="listbox">
				{options.map((option, i) => {
					const isSelected = selectedIndex === i;
					const label = getOptionLabel(option.line);
					const subtitle = option.line.long_name ? `— ${option.line.long_name}` : '';

					return (
						<button
							key={option.key}
							ref={el => option.setRefElement(el)}
							aria-selected={isSelected}
							onMouseEnter={() => setHighlightedIndex(i)}
							role="option"
							type="button"
							className={[
								'mention-typeahead__item',
								isSelected ? 'mention-typeahead__item--selected' : null,
							].filter(Boolean).join(' ')}
							onMouseDown={(e) => {
								e.preventDefault();
								setHighlightedIndex(i);
								selectOptionAndCleanUp(option);
							}}
						>
							<span className="mention-typeahead__label">{TRIGGER}{label}</span>
							{subtitle ? <span className="mention-typeahead__subtitle">{subtitle}</span> : null}
							{matchingString ? null : null}
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

					// Cursor offset within the text node at the time of selection.
					const cursorOffset = selection.anchor.offset;
					const text = textNodeContainingQuery.getTextContent();

					// Find the 'line:' that starts this query (closest one before cursor).
					const start = text.lastIndexOf(TRIGGER, Math.max(0, cursorOffset - 1));
					if (start === -1) return;

					const end = start + TRIGGER.length + matchingString.length;
					if (end > text.length) return;

					const parts = textNodeContainingQuery.splitText(start, end);
					const mentionTextNode = parts.find(n => n.getTextContent().startsWith(TRIGGER));
					if (!mentionTextNode) return;

					const label = getOptionLabel(option.line);
					const mentionNode = $createMentionNode(option.line.id, label);

					mentionTextNode.replace(mentionNode);
					mentionNode.insertAfter($createTextNode(' '));
				});
			}}
		/>
	);
}
