'use client';
/* * */

import type { TextFieldClient } from 'payload';

import { fieldBaseClass, FieldLabel, useField } from '@payloadcms/ui';
import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

interface Props {
	field: TextFieldClient
	path: string
}
/* * */

export function ButtonColorField({ field, path: pathFromProps }: Props) {
	//

	//
	// A. Setup variables

	const { disabled, path, setValue, showError, value } = useField<string>({ path: pathFromProps, potentiallyStalePath: pathFromProps });

	//
	// B. Render components

	return (
		<div className={classNames(fieldBaseClass, 'text', { 'error': showError, 'read-only': disabled })}>
			<FieldLabel label={field.label} localized={field.localized} path={path} required={field.required} />
			<div className={`${fieldBaseClass}__wrap`}>
				<input
					className={styles.swatch}
					disabled={disabled}
					onChange={e => setValue(e.target.value)}
					type="color"
					value={value ?? '#ffdd01'}
				/>
			</div>
		</div>
	);

	//
}
