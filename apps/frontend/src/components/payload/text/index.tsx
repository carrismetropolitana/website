'use client';

/* * */
import { parseStyleString } from '@/utils/parseStyleString';
import { type ReactNode } from 'react';

/* * */

interface TextProps {
	format?: number
	style?: string
	text?: string
}

/* * */

export function Text({ format = 0, style: styleStr, text = '' }: TextProps) {
	//

	//
	// A. Setup variables

	const FORMAT_CODE = 16;
	const FORMAT_BOLD = 1;
	const FORMAT_ITALIC = 2;
	const FORMAT_STRIKETHROUGH = 4;
	const FORMAT_UNDERLINE = 8;

	const inlineStyle = styleStr ? parseStyleString(styleStr) : undefined;

	//
	// B. Render components

	if (format & FORMAT_CODE) {
		return <code key="code" style={inlineStyle}>{text}</code>;
	}

	let formattedText: ReactNode = text;
	if (format & FORMAT_BOLD) formattedText = <strong key="bold">{formattedText}</strong>;
	if (format & FORMAT_ITALIC) formattedText = <em key="italic">{formattedText}</em>;
	if (format & FORMAT_STRIKETHROUGH) formattedText = <s key="strike">{formattedText}</s>;
	if (format & FORMAT_UNDERLINE) formattedText = <u key="underline">{formattedText}</u>;

	if (inlineStyle) {
		return <span style={inlineStyle}>{formattedText}</span>;
	}

	return formattedText;

	//
}
