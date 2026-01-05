'use client';

import { type Note } from '@carrismetropolitana/website-shared-types';
import { Select, TextInput } from '@mantine/core';
import { IconArrowLeft, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

import { PressGenericCard } from '../PressGenericCard';

interface NewsItem {
	date: string
	id: string
	image: string
	isLink: boolean
	title: string
	topic: string
}

export function PressNotesContentSection() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('');
	const router = useRouter();

	const t = useTranslations('press.NotesBase');

	// Fetch notes from CMS
	const { data: notesData, error, isLoading } = useSWR<Note[]>('/admin/public-api/notes');

	// Convert CMS notes to the format expected by the existing UI
	const newsItems: NewsItem[] = React.useMemo(() => {
		if (!notesData) return [];

		return notesData.map(note => ({
			date: new Date(note.publishDate).toLocaleDateString('pt-PT', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}),
			id: note._id,
			image: note.heroImage?.url || 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: false,
			title: note.title,
			topic: note.tags?.[0] || 'Geral',
		}));
	}, [notesData]);

	const filteredNews = newsItems.filter(item =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
		&& (selectedFilter === '' || item.topic === selectedFilter),
	);

	// Get unique topics for filter
	const availableTopics = React.useMemo(() => {
		const topics = new Set(newsItems.map(item => item.topic));
		return Array.from(topics);
	}, [newsItems]);

	const handleTextInputChange = ({ currentTarget }) => {
		setSearchTerm(currentTarget.value);
	};

	const handleCardClick = (newsItem: NewsItem) => {
		// Find the original note data
		const note = notesData?.find(n => n._id === newsItem.id);
		if (!note) return;

		// Always navigate to the detail page
		router.push(`/press/notes/${note.slug}`);
	};

	if (isLoading) {
		return (
			<section className={styles.contentWrapper}>
				<div className={styles.loading}>Carregando notas...</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles.contentWrapper}>
				<div className={styles.error}>Erro ao carregar notas de imprensa.</div>
			</section>
		);
	}

	return (
		<section className={styles.contentWrapper}>

			<div className={styles.breadcrumb}>
				<Link href="/" style={{ alignItems: 'center', color: 'var(--System-Text-300, #9696A0)', display: 'flex', gap: '0.3rem', justifyContent: 'center', lineHeight: 'unset' }}> <IconArrowLeft color="var(--System-Text-300, #9696A0)" size="0.625rem" /> HOME PAGE  </Link> / <Link href="/press" style={{ color: 'var(--System-Text-300, #9696A0)', lineHeight: 'unset' }}>IMPRENSA</Link> / <p style={{ color: 'var(--System-Text-300, #9696A0)', lineHeight: 'unset', textTransform: 'uppercase' }}>{t('section_heading')}</p>
			</div>

			<div className={styles.description}>
				<h2>{t('section_heading')}</h2>
				<p>{t('subheading')}</p>
			</div>

			<div className={styles.searchFilterContainer}>
				<div className={styles.searchContainer}>
					<TextInput leftSection={<IconSearch size={20} />} onChange={handleTextInputChange} placeholder="Pesquisar..." type="search" value={searchTerm} w="100%" />

				</div>
				<div className={styles.filterContainer}>
					<Select
						className={styles.filterSelect}
						onChange={e => setSelectedFilter(e)}
						value={selectedFilter}
						data={[
							{ label: 'Filtrar por tópico...', value: '' },
							...availableTopics.map(topic => ({ label: topic, value: topic })),
						]}
					/>
				</div>
			</div>

			<div className={styles.resultsCount}>
				<p>Encontradas {filteredNews.length} notícias:</p>
			</div>

			<div className={styles.newsGrid}>
				{filteredNews.map(item => (
					<PressGenericCard
						key={item.id}
						newsItem={item}
						onClick={handleCardClick}
						showTopic={false}
					/>
				))}
			</div>
		</section>
	);
}
