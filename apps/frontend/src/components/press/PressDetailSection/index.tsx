'use client';

/* * */

import { IconArrowLeft, IconCopy, IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import styles from './styles.module.css';

import { BreakpointDesktop } from '../../responsive/BreakpointSwitch';
import { PressHeaderGenericSection } from '../PressHeaderGenericSection';

/* * */

interface PressDetailSectionProps {
	body?: string
	contentType?: 'file' | 'link'
	file?: {
		filename?: string
		mimeType?: string
		url?: string
	}
	lead?: string
	link?: string
	parentPath: string
	parentTitle: string
	publishDate: string
	sectionTitle: string
	title: string
	topic?: string
}

export function PressDetailSection({
	body,
	contentType,
	file,
	lead,
	link,
	parentPath,
	parentTitle,
	publishDate,
	sectionTitle,
	title,
	topic,
}: PressDetailSectionProps) {
	const [copied, setCopied] = useState(false);
	const t = useTranslations('press.DetailSection');

	// Format the publish date
	const formattedDate = new Date(publishDate).toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	// Handle download action
	const handleDownload = () => {
		if (file?.url) {
			window.open(file.url, '_blank');
		}
	};

	// Handle copy link action
	const handleCopyLink = async () => {
		if (link) {
			try {
				await navigator.clipboard.writeText(link);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
			catch (error) {
				console.error('Failed to copy link:', error);
			}
		}
	};

	return (
		<div className={styles.container}>
			<BreakpointDesktop>
				<PressHeaderGenericSection title={sectionTitle} />
			</BreakpointDesktop>

			<div className={styles.contentWrapper}>
				{/* Breadcrumb */}
				<nav className={styles.breadcrumb}>
					<Link className={styles.breadcrumbLink} href="/">
						<IconArrowLeft size="0.625rem" />
						HOME PAGE
					</Link>
					<span className={styles.breadcrumbSeparator}>/</span>
					<Link className={styles.breadcrumbLink} href="/press">
						IMPRENSA
					</Link>
					<span className={styles.breadcrumbSeparator}>/</span>
					<Link className={styles.breadcrumbLink} href={parentPath}>
						{parentTitle.toUpperCase()}
					</Link>
					<span className={styles.breadcrumbSeparator}>/</span>
					<span className={styles.breadcrumbCurrent}>
						{title.toUpperCase()}
					</span>
				</nav>

				{/* Article Header */}
				<div className={styles.articleHeader}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.meta}>
						{topic ? (
							<>
								{t('published_at_in', { date: formattedDate })} <span className={styles.topicLink}>{topic}</span>
							</>
						) : (
							t('published_at', { date: formattedDate })
						)}
					</p>
				</div>

				{/* Content Section */}
				<div className={styles.contentSection}>
					{/* Text content container */}
					<div className={styles.textContainer}>
						{/* Lead content */}
						{lead && (
							<div
								className={styles.lead}
								dangerouslySetInnerHTML={{ __html: lead }}
							/>
						)}

						{/* Body content */}
						{body && (
							<div
								className={styles.body}
								dangerouslySetInnerHTML={{ __html: body }}
							/>
						)}
					</div>

					{/* Action button container */}
					{/* Show download button if file exists OR copy link button if link exists */}
					{(file?.url || (contentType === 'link' && link)) && (
						<div className={styles.actionContainer}>
							{file?.url ? (
								<button
									className={styles.actionButton}
									onClick={handleDownload}
									type="button"
								>
									<IconDownload size={18} />
									{t('download')}
								</button>
							) : contentType === 'link' && link ? (
								<button
									className={styles.actionButton}
									onClick={handleCopyLink}
									type="button"
								>
									<IconCopy size={18} />
									{copied ? t('copied') : t('copy_link')}
								</button>
							) : null}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
