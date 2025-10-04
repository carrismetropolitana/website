'use client';

/* * */

import { type KnowledgeBase } from '@carrismetropolitana/website-shared-types';
import { IconArrowLeft, IconDownload, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface PressKnowledgeBaseDetailProps {
	slug: string
}

export function PressKnowledgeBaseDetail({ slug }: PressKnowledgeBaseDetailProps) {
	const router = useRouter();
	const t = useTranslations('home.PressKnowledgeBase');

	// Fetch knowledge base item data
	const { data: item, error, isLoading } = useSWR<KnowledgeBase>(`/admin/public-api/knowledge-base/${slug}`);

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>Carregando...</div>
			</div>
		);
	}

	if (error || !item) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>
					<h1>Item não encontrado</h1>
					<p>O item da base de conhecimento que procura não foi encontrado.</p>
					<Link href="/press/knowledge-base">Voltar à base de conhecimento</Link>
				</div>
			</div>
		);
	}

	// Handle click based on content type
	const handleItemClick = () => {
		if (item.contentType === 'file' && item.file?.url) {
			// For files, trigger download
			window.open(item.file.url, '_blank');
		}
		else if (item.contentType === 'link' && item.link) {
			// For links, open in new tab
			window.open(item.link, '_blank');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.breadcrumb}>
				<Link className={styles.breadcrumbLink} href="/">
					<IconArrowLeft size="0.625rem" />
					HOME PAGE
				</Link>
				<span>/</span>
				<Link className={styles.breadcrumbLink} href="/press">
					IMPRENSA
				</Link>
				<span>/</span>
				<Link className={styles.breadcrumbLink} href="/press/knowledge-base">
					{t('section_heading').toUpperCase()}
				</Link>
				<span>/</span>
				<span className={styles.breadcrumbCurrent}>
					{item.title.toUpperCase()}
				</span>
			</div>

			<article className={styles.article}>
				{item.heroImage && (
					<div className={styles.heroImage}>
						<img alt={item.heroImage.alt || item.title} src={item.heroImage.url} />
					</div>
				)}

				<header className={styles.header}>
					<h1 className={styles.title}>{item.title}</h1>

					{item.publishDate && (
						<time className={styles.publishDate}>
							{new Date(item.publishDate).toLocaleDateString('pt-PT', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</time>
					)}

					{item.topic && (
						<div className={styles.tags}>
							<span className={styles.tag}>
								{item.topic}
							</span>
						</div>
					)}
				</header>

				<div className={styles.content}>
					{item.contentType === 'link' ? (
						<div className={styles.linkContent}>
							<p>Este item redireciona para um link externo.</p>
							<button
								className={styles.actionButton}
								onClick={handleItemClick}
								type="button"
							>
								<IconExternalLink size={20} />
								Abrir Link
							</button>
						</div>
					) : (
						<div className={styles.fileContent}>
							<p>Faça o download do documento abaixo:</p>
							<button
								className={styles.actionButton}
								onClick={handleItemClick}
								type="button"
							>
								<IconDownload size={20} />
								Descarregar {item.file?.filename || 'Arquivo'}
							</button>
							{item.file?.mimeType && (
								<p className={styles.fileInfo}>
									Tipo: {item.file.mimeType}
								</p>
							)}
						</div>
					)}
				</div>

				{item.authors && (
					<footer className={styles.footer}>
						<p className={styles.authors}>
							Autor: {typeof item.authors === 'string' ? item.authors : item.authors.email}
						</p>
					</footer>
				)}
			</article>

			<div className={styles.navigation}>
				<button
					className={styles.backButton}
					onClick={() => router.back()}
					type="button"
				>
					<IconArrowLeft size={16} />
					Voltar
				</button>
			</div>
		</div>
	);
}

