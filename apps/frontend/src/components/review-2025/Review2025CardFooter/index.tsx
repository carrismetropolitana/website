'use client';

/* * */

import Button from '@/components/common/Button';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconBrandFacebook, IconBrandLinkedin, IconBrandWhatsapp, IconBrandX, IconCheck, IconLink, IconShare } from '@tabler/icons-react';
import { useMemo } from 'react';

import cardStyles from '../Review2025Card/styles.module.css';
import styles from './styles.module.css';

import { Review2025Card } from '../_data/cards';

/* * */

interface Props {
	cardData: Review2025Card
	isOpen: boolean
}

/* * */

export function Review2025CardFooter({ cardData, isOpen }: Props) {
	//

	//
	// A. Setup variables

	const shareUrl = useMemo(() => {
		if (typeof window === 'undefined') return '';
		const cardId = cardData.title.toLowerCase().replace(/\s+/g, '-');
		return `${window.location.origin}${window.location.pathname}?card=${cardId}`;
	}, [cardData.title]);

	const shareText = useMemo(() => {
		return `${cardData.title} - Carris Metropolitana 2025`;
	}, [cardData.title]);

	//
	// B. Handle actions

	const handleShareLinkedIn = () => {
		const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
		window.open(url, '_blank', 'width=600,height=600');
	};

	const handleShareWhatsApp = () => {
		const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
		window.open(url, '_blank', 'width=600,height=600');
	};

	const handleShareX = () => {
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
		window.open(url, '_blank', 'width=600,height=600');
	};

	const handleShareFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
		window.open(url, '_blank', 'width=600,height=600');
	};

	const handleOpenShareModal = () => {
		modals.open({
			children: (
				<div className={styles.modalContent}>
					<p className={styles.modalMessage}>Partilhe este cartão nas suas redes sociais</p>
					<p className={styles.modalUrl}>{shareUrl}</p>
					<div className={styles.shareButtons}>
						<Tooltip label="LinkedIn" withArrow>
							<ActionIcon className={styles.shareButton} onClick={handleShareLinkedIn} radius="xl" size="xl" variant="light">
								<IconBrandLinkedin size={24} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="WhatsApp" withArrow>
							<ActionIcon className={styles.shareButton} onClick={handleShareWhatsApp} radius="xl" size="xl" variant="light">
								<IconBrandWhatsapp size={24} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="X" withArrow>
							<ActionIcon className={styles.shareButton} onClick={handleShareX} radius="xl" size="xl" variant="light">
								<IconBrandX size={24} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label="Facebook" withArrow>
							<ActionIcon className={styles.shareButton} onClick={handleShareFacebook} radius="xl" size="xl" variant="light">
								<IconBrandFacebook size={24} />
							</ActionIcon>
						</Tooltip>

						<CopyButton timeout={2000} value={shareUrl}>
							{({ copied, copy }) => (
								<Tooltip label={copied ? 'Copiado!' : 'Copiar link'} withArrow>
									<ActionIcon className={styles.shareButton} color={copied ? 'teal' : undefined} onClick={copy} radius="xl" size="xl" variant="light">
										{copied ? <IconCheck size={24} /> : <IconLink size={24} />}
									</ActionIcon>
								</Tooltip>
							)}
						</CopyButton>
					</div>
				</div>
			),
			title: <span className={styles.modalTitle}>Partilhar</span>,
		});
	};

	//
	// C. Render components

	return (
		<div className={`${cardStyles.footer} ${cardStyles.contentCollapsible}`} data-open={isOpen}>
			<Button icon={<IconShare />} label="Partilhar" onClick={handleOpenShareModal} />
		</div>
	);

	//
}
