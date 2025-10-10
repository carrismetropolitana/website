'use client';

/* * */

import { type Note } from '@carrismetropolitana/website-shared-types';
import { IconArrowLeft, IconDownload, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface PressNoteDetailProps {
	slug: string
}

export function PressNoteDetail({ slug }: PressNoteDetailProps) {
	const router = useRouter();
	const t = useTranslations('press.NotesBase');

	// Fetch note data
	const { data: note, error, isLoading } = useSWR<Note>(`/admin/public-api/notes/${slug}`);

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>Carregando...</div>
			</div>
		);
	}

	if (error || !note) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>
					<h1>Nota não encontrada</h1>
					<p>A nota de imprensa que procura não foi encontrada.</p>
					<Link href="/press/notes">Voltar às notas de imprensa</Link>
				</div>
			</div>
		);
	}

	// Handle click based on content type
	const handleNoteClick = () => {
		if (note.contentType === 'file' && note.file?.url) {
			// For files, trigger download
			window.open(note.file.url, '_blank');
		}
		else if (note.contentType === 'link' && note.link) {
			// For links, open in new tab
			window.open(note.link, '_blank');
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
				<Link className={styles.breadcrumbLink} href="/press/notes">
					{t('section_heading').toUpperCase()}
				</Link>
				<span>/</span>
				<span className={styles.breadcrumbCurrent}>
					{note.title.toUpperCase()}
				</span>
			</div>

			<article className={styles.article}>
				{note.heroImage && (
					<div className={styles.heroImage}>
						<img alt={note.heroImage.alt || note.title} src={note.heroImage.url} />
					</div>
				)}

				<header className={styles.header}>
					<h1 className={styles.title}>{note.title}</h1>

					{note.publishDate && (
						<time className={styles.publishDate}>
							{new Date(note.publishDate).toLocaleDateString('pt-PT', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</time>
					)}

					{note.tags && note.tags.length > 0 && (
						<div className={styles.tags}>
							{note.tags.map(tag => (
								<span key={tag} className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
					)}
				</header>

				<div className={styles.content}>
					{note.contentType === 'link' ? (
						<div className={styles.linkContent}>
							<p>Esta nota de imprensa redireciona para um link externo.</p>
							<button
								className={styles.actionButton}
								onClick={handleNoteClick}
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
								onClick={handleNoteClick}
								type="button"
							>
								<IconDownload size={20} />
								Descarregar {note.file?.filename || 'Arquivo'}
							</button>
							{note.file?.mimeType && (
								<p className={styles.fileInfo}>
									Tipo: {note.file.mimeType}
								</p>
							)}
						</div>
					)}
				</div>

				{note.authors && (
					<footer className={styles.footer}>
						<p className={styles.authors}>
							Autor: {typeof note.authors === 'string' ? note.authors : note.authors.email}
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
