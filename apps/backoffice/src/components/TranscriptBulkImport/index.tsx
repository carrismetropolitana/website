'use client';

import { Button, useField, useForm } from '@payloadcms/ui';
import { useState } from 'react';

interface TranscriptSegment {
	endTime?: number
	speaker: 'guest' | 'host'
	speakerName: string
	startTime?: number
	text: string
}

interface Props {
	path: string
	schemaPath: string
}

interface FieldStateValue {
	initialValue: number | string
	valid: true
	value: number | string
}

const HOST_NAMES = new Set(['entrevistador', 'host']);

function parseTimestamp(value: string | undefined): number | undefined {
	if (!value) return undefined;
	const [hours, minutes, seconds] = value.split(':').map(Number);
	return hours * 3600 + minutes * 60 + seconds;
}

function parseSegments(value: string): TranscriptSegment[] {
	return value
		.split(/\n\s*\n/)
		.map(block => block.trim())
		.filter(Boolean)
		.map((block) => {
			const match = block.match(
				/^(?:\[(\d{2}:\d{2}:\d{2})\]\s*)?([^:\n]+):\s*([\s\S]+)$/,
			);

			if (!match) return null;

			const [, timestamp, speakerName, text] = match;
			const normalizedName = speakerName.trim().toLocaleLowerCase('pt-PT');
			const speaker: TranscriptSegment['speaker'] = HOST_NAMES.has(normalizedName) ? 'host' : 'guest';
			return {
				speaker,
				speakerName: speakerName.trim(),
				startTime: parseTimestamp(timestamp),
				text: text.trim(),
			};
		})
		.filter(segment => segment !== null);
}

export function TranscriptBulkImport({ path: pathFromProps, schemaPath }: Props) {
	const [source, setSource] = useState('');
	const [error, setError] = useState<null | string>(null);
	const { disabled } = useField<TranscriptSegment[]>({
		path: pathFromProps,
		potentiallyStalePath: pathFromProps,
	});
	const { addFieldRow, getDataByPath } = useForm();

	const importSegments = () => {
		const segments = parseSegments(source);
		if (segments.length === 0) {
			setError('Use uma fala por parágrafo: [00:00:25] Host: texto. O tempo é opcional.');
			return;
		}

		const currentSegments = getDataByPath(pathFromProps);
		const nextRowIndex = Array.isArray(currentSegments) ? currentSegments.length : 0;

		for (const [index, segment] of segments.entries()) {
			const subFieldState: Record<string, FieldStateValue> = {
				speaker: { initialValue: segment.speaker, valid: true, value: segment.speaker },
				speakerName: { initialValue: segment.speakerName, valid: true, value: segment.speakerName },
				text: { initialValue: segment.text, valid: true, value: segment.text },
			};

			if (segment.startTime !== undefined) {
				subFieldState.startTime = {
					initialValue: segment.startTime,
					valid: true,
					value: segment.startTime,
				};
			}

			addFieldRow({
				path: pathFromProps,
				rowIndex: nextRowIndex + index,
				schemaPath,
				subFieldState,
			});
		}
		setSource('');
		setError(null);
	};

	return (
		<div style={{ marginBottom: '1rem' }}>
			<p style={{ fontWeight: 600, marginBottom: '.25rem' }}>Importar falas</p>
			<p style={{ marginBottom: '.75rem' }}>
				Cole uma fala por parágrafo. Exemplo: <code>[00:00:25] Host: Pergunta</code>.
				{' Em entrevistas escritas, omita o tempo.'}
			</p>
			<textarea
				disabled={disabled}
				onChange={event => setSource(event.target.value)}
				rows={8}
				style={{ width: '100%' }}
				value={source}
			/>
			{error ? <p style={{ color: 'var(--theme-error-500)' }}>{error}</p> : null}
			<Button buttonStyle="secondary" disabled={disabled || !source.trim()} onClick={importSegments} type="button">
				Adicionar falas
			</Button>
		</div>
	);
}
