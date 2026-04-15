export interface Project {
	_id?: string
	_status?: 'draft' | 'published'
	description?: string
	featured_image?: {
		filename?: string
		thumbnailURL?: string
		url?: string
	}
	id: string
	is_unlisted?: boolean
	keywords?: { id?: string, value?: string }[]
	more_info_url?: string
	publishedAt: string
	title?: string
	updatedAt: string
}
