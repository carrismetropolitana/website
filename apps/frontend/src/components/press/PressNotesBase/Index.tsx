'use client';

/* * */

import Carousel from '@/components/common/Carousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { SeeMoreCard } from '@/components/news/SeeMoreCard';
import { PressGenericCard } from '@/components/press/PressGenericCard';
import { type Note } from '@carrismetropolitana/website-shared-types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

/* * */

interface NewsItem {
	date: string
	id: string
	image: string
	isLink: boolean
	title: string
	topic: string
}

export function PressNotesBase() {
	//

	//
	// A. Setup variables

	const t = useTranslations('press.NotesBase');
	const router = useRouter();

	//
	// B. Fetch data from API

	const { data: notesData } = useSWR<Note[]>('/admin/public-api/notes');

	//
	// C. Transform data

	const newsItems: NewsItem[] = React.useMemo(() => {
		if (!notesData) return [];

		// Take only the first 6 items for the carousel
		return notesData.slice(0, 6).map(note => ({
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

	//
	// D. Handle click

	const handleCardClick = (newsItem: NewsItem) => {
		const note = notesData?.find(n => n._id === newsItem.id);
		if (!note) return;

		// Always navigate to the detail page
		router.push(`/press/notes/${note.slug}`);
	};

	//
	// E. Build carousel slides

	const carouselSlides = newsItems.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<PressGenericCard
				newsItem={slideItem}
				onClick={handleCardClick}
				showTopic={false}
			/>
		),
	}));

	// Add "See More" card as last item
	carouselSlides.push({
		_id: 'see-more',
		component: <SeeMoreCard href="/press/notes" />,
	});

	//
	// F. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/press/notes" subheading={t('subheading')}>
				<Carousel
					skeletonComponent={<NewsCardSkeleton />}
					skeletonQty={4}
					slides={carouselSlides}
				/>
			</Section>
		</Surface>
	);
}
