'use client';

/* * */

import Carousel from '@/components/common/CarouselControlled';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PressGenericCard } from '@/components/home/PressGenericCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { SeeMoreCard } from '@/components/news/SeeMoreCard';
import { type Note } from '@carrismetropolitana/website-shared-types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

/* * */

interface NewsItem {
	id: string;
	title: string;
	date: string;
	topic: string;
	image: string;
	isLink: boolean;
}

export function PressNotesBase() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.PressNotesBase');
	const router = useRouter();

	//
	// B. Fetch data from API

	const { data: notesData, isLoading } = useSWR<Note[]>('/admin/public-api/notes');

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
			isLink: note.contentType === 'link',
			title: note.title,
			topic: note.tags?.[0] || 'Geral',
		}));
	}, [notesData]);

	//
	// D. Handle click

	const handleCardClick = (newsItem: NewsItem) => {
		const note = notesData?.find(n => n._id === newsItem.id);
		if (!note) return;

		if (note.contentType === 'file' && note.file?.url) {
			window.open(note.file.url, '_blank');
		}
		else if (note.contentType === 'link' && note.link) {
			router.push(`/press/notes/${note.slug}`);
		}
		else {
			router.push(`/press/notes/${note.slug}`);
		}
	};

	//
	// E. Build carousel slides

	const carouselSlides = newsItems.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<PressGenericCard
				newsItem={slideItem}
				showTopic={false}
				onClick={handleCardClick}
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
			<Section heading={t('section_heading')} href="/press/notes">
				<Carousel 
					subheading={t('subheading')} 
					skeletonComponent={<NewsCardSkeleton />} 
					skeletonQty={4} 
					slides={carouselSlides}
				/>
			</Section>
		</Surface>
	);
}
