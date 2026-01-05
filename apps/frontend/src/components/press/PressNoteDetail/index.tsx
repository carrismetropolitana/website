'use client';

/* * */

import { type Note } from '@carrismetropolitana/website-shared-types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useSWR from 'swr';

import styles from './styles.module.css';

import { PressDetailSection } from '../PressDetailSection';

/* * */

interface PressNoteDetailProps {
	slug: string
}

export function PressNoteDetail({ slug }: PressNoteDetailProps) {
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

	return (
		<PressDetailSection
			body={note.body}
			contentType={note.contentType}
			file={note.file}
			lead={note.lead}
			parentPath="/press/notes"
			parentTitle={t('section_heading')}
			publishDate={note.publishDate}
			sectionTitle={t('section_heading')}
			title={note.title}
		/>
	);
}
