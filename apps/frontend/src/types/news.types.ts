export interface NewsData {
	body: string
	featured_image: {
		filename: string
		thumbnailURL: string
		url: string
	}
	id: string
	publishedAt: string
	summary: string
	title: string
	topics: string[]
	updated_at: string
}
