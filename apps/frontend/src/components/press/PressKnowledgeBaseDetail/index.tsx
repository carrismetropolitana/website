'use client';

/* * */

import { type KnowledgeBase } from '@carrismetropolitana/website-shared-types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useSWR from 'swr';

import styles from './styles.module.css';

import { PressDetailSection } from '../PressDetailSection';

/* * */

interface PressKnowledgeBaseDetailProps {
	slug: string
}

export function PressKnowledgeBaseDetail({ slug }: PressKnowledgeBaseDetailProps) {
	const t = useTranslations('press.KnowledgeBase');

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

	return (
		<PressDetailSection
			body={item.body}
			contentType={item.contentType}
			file={item.file}
			lead={item.lead}
			link={item.link}
			parentPath="/press/knowledge-base"
			parentTitle={t('section_heading')}
			publishDate={item.publishDate}
			sectionTitle={t('section_heading')}
			title={item.title}
			topic={item.topic}
		/>
	);
}
