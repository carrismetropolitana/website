'use client';
/* * */

import type { HeadingAnchorFeatureProps } from './types';

import { $getNodeByKey } from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';

import { subscribeAnchorPopover } from './anchorPopoverStore';
import { $isCustomHeadingNode, type CustomHeadingNode } from './CustomHeadingNode';
import { defaultHeadingAnchorFeatureProps } from './types';

/* * */

interface HeadingAnchorPluginProps {
	clientProps: HeadingAnchorFeatureProps
}

export function HeadingAnchorPlugin({ clientProps }: HeadingAnchorPluginProps) {
	//

	//
	// A. Setup variables

	const { inputWidth, label, placeholder } = { ...defaultHeadingAnchorFeatureProps, ...clientProps };
	const [editor] = useLexicalComposerContext();
	const [headingKey, setHeadingKey] = useState<null | string>(null);
	const [anchorId, setAnchorId] = useState('');
	const [position, setPosition] = useState<null | { left: number, top: number }>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const updateNodeTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

	//
	// B. Transform Data

	const updatePosition = useCallback(() => {
		if (!headingKey) {
			setPosition(null);
			return;
		}
		const dom = editor.getElementByKey(headingKey);
		if (dom) {
			const rect = dom.getBoundingClientRect();
			setPosition({
				left: rect.left,
				top: rect.top - 28,
			});
		}
	}, [editor, headingKey]);

	useEffect(() => {
		if (!headingKey) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [headingKey]);

	useEffect(() => {
		return subscribeAnchorPopover((key) => {
			setHeadingKey(key);
			if (key) {
				editor.getEditorState().read(() => {
					const node = $getNodeByKey(key);
					if (node && $isCustomHeadingNode(node)) {
						setAnchorId((node as CustomHeadingNode).getAnchorId());
					}
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
		if (!headingKey) return;
		if (updateNodeTimeoutRef.current) clearTimeout(updateNodeTimeoutRef.current);
		updateNodeTimeoutRef.current = setTimeout(() => {
			updateNodeTimeoutRef.current = null;
			editor.update(() => {
				const node = $getNodeByKey(headingKey);
				if (node && $isCustomHeadingNode(node)) {
					node.setAnchorId(sanitized);
				}
			});
		}, 250);
	};

	const handleClose = () => {
		if (updateNodeTimeoutRef.current) {
			clearTimeout(updateNodeTimeoutRef.current);
			updateNodeTimeoutRef.current = null;
		}
		setHeadingKey(null);
	};

	//
	// D. Render components

	if (!headingKey || !position) return null;

	return ReactDOM.createPortal(
		<>
			<div
				ref={backdropRef}
				onMouseDown={(e) => {
					if (e.target === backdropRef.current) handleClose();
				}}
				style={{
					inset: 0,
					position: 'fixed',
					zIndex: 99,
				}}
				aria-hidden
			/>
			<div
				ref={panelRef}
				onMouseDown={e => e.preventDefault()}
				style={{
					alignItems: 'center',
					background: 'var(--theme-elevation-50)',
					border: '1px solid var(--theme-elevation-150)',
					borderRadius: '4px',
					boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
					display: 'flex',
					fontSize: '12px',
					gap: '4px',
					left: position.left,
					padding: '2px 8px',
					position: 'fixed',
					top: position.top,
					zIndex: 100,
				}}
			>
				<span style={{ color: 'var(--theme-elevation-500)', fontWeight: 600 }}>{label}</span>
				<input
					onChange={e => handleChange(e.target.value)}
					placeholder={placeholder}
					value={anchorId}
					style={{
						background: 'transparent',
						border: 'none',
						color: 'var(--theme-elevation-800)',
						fontSize: '12px',
						outline: 'none',
						padding: '2px 0',
						width: `${inputWidth}px`,
					}}
					autoFocus
				/>
			</div>
		</>,
		document.body,
	);

	//
}
