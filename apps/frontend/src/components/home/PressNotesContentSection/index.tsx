'use client';

import { Select, TextInput } from '@mantine/core';
import { IconArrowLeft, IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';

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

	const t = useTranslations('home.PressNotesBase');

	const newsItems: NewsItem[] = [
		{
			date: '30 de Abril de 2024',
			id: '1',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: true,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Fevereiro de 2024',
			id: '2',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: true,
			title: 'Balanço da operação Carris Metropolitana em 2024',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '3',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: true,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '4',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: true,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '5',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: false,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '6',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: false,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '7',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: false,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
		{
			date: '30 de Abril de 2024',
			id: '8',
			image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: false,
			title: 'Resultados do Inquérito de Satisfação aos Passageiros',
			topic: 'Tópico',
		},
	];

	const filteredNews = newsItems.filter(item =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
		&& (selectedFilter === '' || item.topic === selectedFilter),
	);

	const handleTextInputChange = ({ currentTarget }) => {
		setSearchTerm(currentTarget.value);
	};

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
							{ label: 'Tópico', value: 'Tópico' },
							{ label: 'Relatório', value: 'Relatório' },
							{ label: 'Notícia', value: 'Notícia' },
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
						showTopic={false}
						onClick={(newsItem) => {
							console.log('Clicked news item:', newsItem);
						}}
					/>
				))}
			</div>
		</section>
	);
}
