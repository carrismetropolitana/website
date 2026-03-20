'use client';
/* * */

import type { TextFieldClient } from 'payload';

import { fieldBaseClass, FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui';

import styles from './styles.module.css';

/* * */

function normalizeHex(value: unknown, fallback: string): string {
	if (typeof value !== 'string') return fallback;
	const h = value.trim();
	if (/^#[0-9A-Fa-f]{3}$/.test(h)) {
		const [, r, g, b] = h;
		return `#${r}${r}${g}${g}${b}${b}`;
	}
	if (/^#[0-9A-Fa-f]{6}$/.test(h)) return h;
	return fallback;
}

/* * */

export function ButtonColorField(props: { field: TextFieldClient, path: string }) {
	//

	const { field, path: pathFromProps } = props;

	const { disabled, path, setValue, showError, value } = useField<string>({
		path: pathFromProps,
		potentiallyStalePath: pathFromProps,
	});

	const fallback = '#ffdd01';
	const hex = normalizeHex(value, fallback);

	//
	// B. Render components

	return (
		<div
			className={[fieldBaseClass, 'text', showError && 'error', disabled && 'read-only'].filter(Boolean).join(' ')}
		>
			<FieldLabel label={field.label} localized={field.localized} path={path} required={field.required} />
			<div className={`${fieldBaseClass}__wrap`}>
				<div className={styles.row}>
					<input
						className={styles.swatch}
						disabled={disabled}
						onChange={e => setValue(e.target.value)}
						type="color"
						value={hex}
					/>
					<input
						aria-label={typeof field.label === 'string' ? field.label : 'Cor (hex)'}
						className={styles.hexInput}
						disabled={disabled}
						onChange={e => setValue(e.target.value)}
						placeholder="#ffdd01"
						spellCheck={false}
						type="text"
						value={typeof value === 'string' ? value : ''}
					/>
				</div>
				<FieldDescription description={field.admin?.description} path={path} />
				<FieldError path={path} showError={showError} />
			</div>
		</div>
	);

	//
}
