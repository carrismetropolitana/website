'use client';
/* * */

import type { HeadingAnchorFeatureProps } from './types';

import { $getNodeByKey } from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';

import styles from './styles.module.css';

import { subscribeAnchorPopover } from './anchorPopoverStore';
import { $isCustomHeadingNode } from './CustomHeadingNode';
import { defaultHeadingAnchorFeatureProps } from './types';

/* * */

const propsWithDefaults = (p: HeadingAnchorFeatureProps) => ({ ...defaultHeadingAnchorFeatureProps, ...p });

/* * */

export function HeadingAnchorPlugin({ clientProps }: { clientProps: HeadingAnchorFeatureProps }) {
	//

	//
	// A. Setup Variables

	const { inputWidth, label, placeholder } = propsWithDefaults(clientProps);
	const [editor] = useLexicalComposerContext();
	const [headingKey, setHeadingKey] = useState<null | string>(null);
	const [anchorId, setAnchorId] = useState('');
	const [position, setPosition] = useState<null | { left: number, top: number }>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const updateNodeTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

	//
	// B. Transform Data

	const updatePosition = useCallback(() => {
		if (!headingKey) {
			setPosition(null);
			return;
		}
		const dom = editor.getElementByKey(headingKey);
		setPosition(dom ? { left: dom.getBoundingClientRect().left, top: dom.getBoundingClientRect().top - 28 } : null);
	}, [editor, headingKey]);

	useEffect(() => {
		return subscribeAnchorPopover((key) => {
			setHeadingKey(key);
			if (key) {
				editor.getEditorState().read(() => {
					const node = $getNodeByKey(key);
					if ($isCustomHeadingNode(node)) setAnchorId(node.getAnchorId());
				});
			}
		});
	}, [editor]);

	useEffect(() => {
		updatePosition();
		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);
		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	}, [updatePosition]);
	//
	// C. Handle Actions

	const handleChange = (value: string) => {
		const sanitized = value.toLowerCase().replace(/\s+/g, '-');
		setAnchorId(sanitized);
		if (updateNodeTimeoutRef.current) clearTimeout(updateNodeTimeoutRef.current);
		updateNodeTimeoutRef.current = setTimeout(() => {
			updateNodeTimeoutRef.current = null;
			if (!headingKey) return;
			editor.update(() => {
				const node = $getNodeByKey(headingKey);
				if ($isCustomHeadingNode(node)) node.setAnchorId(sanitized);
			});
		}, 250);
	};

	const handleClose = useCallback(() => {
		if (updateNodeTimeoutRef.current) {
			clearTimeout(updateNodeTimeoutRef.current);
			updateNodeTimeoutRef.current = null;
		}
		setHeadingKey(null);
	}, []);

	useEffect(() => {
		if (!headingKey) return;
		const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [headingKey, handleClose]);

	//
	// D. Render Component

	if (!headingKey || !position) return null;

	return ReactDOM.createPortal(
		<>
			<div
				ref={backdropRef}
				className={styles.backdrop}
				onMouseDown={e => e.target === backdropRef.current && handleClose()}
				aria-hidden
			/>
			<div ref={panelRef} className={styles.panel} onMouseDown={e => e.preventDefault()} style={{ left: position.left, top: position.top }}>
				<span className={styles.label}>{label}</span>
				<input
					className={styles.input}
					onChange={e => handleChange(e.target.value)}
					placeholder={placeholder}
					style={{ width: `${inputWidth}px` }}
					value={anchorId}
					autoFocus
				/>
			</div>
		</>,
		document.body,
	);

	//
}
