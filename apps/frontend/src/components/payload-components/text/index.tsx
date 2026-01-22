'use client';
/* * */

import { type ReactNode } from 'react';

/* * */

interface TextProps {
	format?: number
	text?: string
}

/* * */

export function Text({ format = 0, text = '' }: TextProps) {
	//

	//
	// A. Setup variables

	const FORMAT_CODE = 16;
	const FORMAT_BOLD = 1;
	const FORMAT_ITALIC = 2;
	const FORMAT_STRIKETHROUGH = 4;
	const FORMAT_UNDERLINE = 8;

	//
	// B. Render components

	if (format & FORMAT_CODE) {
		return <code key="code">{text}</code>;
	}

	let formattedText: ReactNode = text;
	if (format & FORMAT_BOLD) formattedText = <strong key="bold">{formattedText}</strong>;
	if (format & FORMAT_ITALIC) formattedText = <em key="italic">{formattedText}</em>;
	if (format & FORMAT_STRIKETHROUGH) formattedText = <s key="strike">{formattedText}</s>;
	if (format & FORMAT_UNDERLINE) formattedText = <u key="underline">{formattedText}</u>;

	return formattedText;

	//
}
