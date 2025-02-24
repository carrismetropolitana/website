'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Section } from '@/components/layout/Section';
import { LineBadge } from '@/components/lines/LineBadge';
import { Review2024CardSchema } from '@/components/review-2024/_data/cards';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Button, CopyButton, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconShare2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Review2024CardSchema
	isFirstChild?: boolean
	isLastChild?: boolean
}

interface CustomCSSProperties extends React.CSSProperties {
	'--color-border'?: string
	'--color-primary': string
	'--color-text': string
}

/* * */

export function Review2024Card({ cardData, isFirstChild, isLastChild }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024Card');

	const [isOpen, setIsOpen] = useState(false);
	const [shareCardId, setShareCardId] = useQueryState('card');
	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	const stylesData: CustomCSSProperties = {
		'--color-border': cardData.colors.border || cardData.colors.primary,
		'--color-primary': cardData.colors.primary,
		'--color-text': cardData.colors.text,
	};

	const shareUrl = useMemo(() => {
		if (typeof window === 'undefined') return;
		return `${window.location.origin}${window.location.pathname}?card=${cardData._id}`;
	}, []);
	//
	// C. Handle actions

	useEffect(() => {
		if (!shareCardId) return;
		if (shareCardId === cardData._id) {
			setTimeout(() => {
				const cardElem = document.getElementById(cardData._id);
				if (!cardElem) return;
				window.scroll({ behavior: 'smooth', top: cardElem.offsetTop - 120 });
				setTimeout(() => {
					setIsOpen(true);
					setTimeout(() => {
						setShareCardId(null);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}, [shareCardId]);

	const handleToggleIsOpen = () => {
		setIsOpen(prev => !prev);
		analyticsContext.actions.capture(ampli => ampli.openCardViagem2024({ card_id: cardData._id, card_title: cardData.header.title }));
		console.log(cardData._id);
	};

	const handleShareUrl = () => {
		modals.open({
			children: (
				<Section withGap>
					<p>{t('share.message')}</p>
					<p className={styles.urlCopy}>{shareUrl}</p>
					<CopyButton timeout={1500} value={shareUrl || ''}>
						{({ copied, copy }) => (
							<Button onClick={copy} variant="secondary" w="100%">
								{copied ? t('share.copied') : t('share.copy')}
							</Button>
						)}
					</CopyButton>
				</Section>
			),
			title: (
				<p className={styles.urlTitle}>{t('share.title')}</p>
			),
		});
		analyticsContext.actions.capture(ampli => ampli.shareCardViagem2024({ card_id: cardData._id, card_title: cardData.header.title }));
	};

	//
	// D. Render components

	return (
		<div className={styles.container} data-is-first={isFirstChild} data-is-last={isLastChild} data-open={isOpen} data-type={cardData._type} id={cardData._id} style={stylesData}>

			<div className={styles.header} onClick={handleToggleIsOpen}>
				<p className={styles.headerTitle}>{cardData.header.title}</p>
				<p className={styles.headerNumber}>{cardData.header.number}</p>
			</div>

			<div className={styles.content}>
				<div className={styles.innerWrapper}>

					{(!cardData._type || cardData._type === 'default') && (
						<div className={styles.contentNumber}>
							<p className={styles.contentNumberValue}>{cardData.content.number_value}</p>
							<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
						</div>
					)}

					{cardData._type === 'lines' && (
						<div className={styles.contentNumber}>
							<div className={styles.contentNumberLinesWrapper}>
								{cardData.content.line_ids?.[0] && <LineBadge lineId={cardData.content.line_ids[0]} />}
								{cardData.content.line_ids?.[1] && <LineBadge lineId={cardData.content.line_ids[1]} />}
								{cardData.content.line_ids?.[2] && <LineBadge lineId={cardData.content.line_ids[2]} />}
							</div>
							<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
						</div>
					)}

					{cardData._type === 'terminals' && (
						<>
							<div className={styles.contentNumber}>
								<p className={styles.contentNumberTitle}>{cardData.content.terminals?.[0].title}</p>
								<div className={styles.contentNumberTerminalsWrapper}>
									<p className={styles.contentNumberValue}>{cardData.content.terminals?.[0].value}</p>
									<p className={styles.contentNumberLegend}>{cardData.content.terminals?.[0].legend}</p>
								</div>
							</div>
							<div className={styles.contentNumber}>
								<p className={styles.contentNumberTitle}>{cardData.content.terminals?.[1].title}</p>
								<div className={styles.contentNumberTerminalsWrapper}>
									<p className={styles.contentNumberValue}>{cardData.content.terminals?.[1].value}</p>
									<p className={styles.contentNumberLegend}>{cardData.content.terminals?.[1].legend}</p>
								</div>
							</div>
							<div className={styles.contentNumber}>
								<p className={styles.contentNumberTitle}>{cardData.content.terminals?.[2].title}</p>
								<div className={styles.contentNumberTerminalsWrapper}>
									<p className={styles.contentNumberValue}>{cardData.content.terminals?.[2].value}</p>
									<p className={styles.contentNumberLegend}>{cardData.content.terminals?.[2].legend}</p>
								</div>
							</div>
						</>
					)}

					{cardData._type !== 'terminals' && cardData.content.lottie_src && (
						<div className={styles.contentLottie}>
							{isOpen && (
								<LottiePlayer
									path={cardData.content.lottie_src}
									loop
									play
								/>
							)}
						</div>
					)}

					<p className={styles.contentTitle}>{cardData.content?.title}</p>
					<p className={styles.contentDescription} dangerouslySetInnerHTML={{ __html: cardData.content?.description?.replace(/\n/g, '<br />') || '' }} />

					<Tooltip label={t('share.tooltip')} withArrow>
						<div className={styles.shareButton} onClick={handleShareUrl}>
							<IconShare2 />
						</div>
					</Tooltip>

				</div>
			</div>

		</div>
	);

	//
}
