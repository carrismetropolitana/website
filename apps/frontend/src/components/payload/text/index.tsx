'use client';

/* * */
import { parseStyleString } from '@/utils/parseStyleString';
import { type ReactNode } from 'react';

/* * */

interface TextProps {
	disableAutoLink?: boolean
	format?: number
	style?: string
	text?: string
}

/* * */

export function Text({ disableAutoLink = false, format = 0, style: styleStr, text = '' }: TextProps) {
	//

	//
	// A. Setup variables

	const FORMAT_CODE = 16;
	const FORMAT_BOLD = 1;
	const FORMAT_ITALIC = 2;
	const FORMAT_STRIKETHROUGH = 4;
	const FORMAT_UNDERLINE = 8;

	const inlineStyle = styleStr ? parseStyleString(styleStr) : undefined;
	const trimmedText = text.trim();
	const isBareEmail = /^[^\s<>()[\]\\.,;:@"]+@[^\s<>()[\]\\.,;:@"]+\.[^\s<>()[\]\\.,;:@"]+$/i.test(trimmedText);
	const hrefFromText = isBareEmail ? `mailto:${trimmedText}` : trimmedText;
	const isMailtoHref = /^mailto:\S+$/i.test(trimmedText);
	const isTelHref = /^tel:\+?[0-9()\-\s]+$/i.test(trimmedText);
	const isAutoLink = !disableAutoLink && (/^(https?:\/\/\S+|\/\/\S+)$/i.test(trimmedText) || isMailtoHref || isTelHref || isBareEmail);
	const isWebLink = /^https?:\/\//i.test(trimmedText) || trimmedText.startsWith('//');

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
		if (isAutoLink) {
			return (
				<a href={hrefFromText} rel={isWebLink ? 'noreferrer noopener' : undefined} style={inlineStyle} target={isWebLink ? '_blank' : undefined}>
					{formattedText}
				</a>
			);
		}

		return <span style={inlineStyle}>{formattedText}</span>;
	}

	if (isAutoLink) {
		return (
			<a href={hrefFromText} rel={isWebLink ? 'noreferrer noopener' : undefined} target={isWebLink ? '_blank' : undefined}>
				{formattedText}
			</a>
		);
	}

	return formattedText;

	//
}
