'use client';

/* * */

import Carousel from '@/components/common/CarouselControlled';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PressGenericCard } from '@/components/home/PressGenericCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { SeeMoreCard } from '@/components/news/SeeMoreCard';
import { type KnowledgeBase } from '@carrismetropolitana/website-shared-types';
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

export function PressKnowledgeBase() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.PressKnowledgeBase');
	const router = useRouter();

	//
	// B. Fetch data from API

	const { data: knowledgeBaseData, isLoading } = useSWR<KnowledgeBase[]>('/admin/public-api/knowledge-base');

	//
	// C. Transform data

	const newsItems: NewsItem[] = React.useMemo(() => {
		if (!knowledgeBaseData) return [];

		// Take only the first 6 items for the carousel
		return knowledgeBaseData.slice(0, 6).map(item => ({
			date: new Date(item.publishDate).toLocaleDateString('pt-PT', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}),
			id: item._id,
			image: item.heroImage?.url || 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594',
			isLink: item.contentType === 'link',
			title: item.title,
			topic: item.topic || 'Geral',
		}));
	}, [knowledgeBaseData]);

	//
	// D. Handle click

	const handleCardClick = (newsItem: NewsItem) => {
		const item = knowledgeBaseData?.find(kb => kb._id === newsItem.id);
		if (!item) return;

		if (item.contentType === 'file' && item.file?.url) {
			window.open(item.file.url, '_blank');
		}
		else if (item.contentType === 'link' && item.link) {
			router.push(`/press/knowledge-base/${item.slug}`);
		}
		else {
			router.push(`/press/knowledge-base/${item.slug}`);
		}
	};

	//
	// E. Build carousel slides

	const carouselSlides = newsItems.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<PressGenericCard
				newsItem={slideItem}
				showTopic={true}
				onClick={handleCardClick}
			/>
		),
	}));

	// Add "See More" card as last item
	carouselSlides.push({
		_id: 'see-more',
		component: <SeeMoreCard href="/press/knowledge-base" />,
	});

	//
	// F. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/press/knowledge-base">
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
