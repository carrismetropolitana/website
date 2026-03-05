import { AccordionData } from './accordion.types';

export interface NewsData {
	accordion?: AccordionData
	body: string
	featured_image: {
		filename: string
		thumbnailURL: string
		url: string
	}
	id: string
	is_featured: boolean
	is_unlisted: boolean
	publishedAt: string
	slug?: string
	summary: string
	title: string
	topics: string[]
	updated_at: string
}
