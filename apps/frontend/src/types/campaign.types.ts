/* * */

export interface CampaignData {
	body: string
	featured_image?: {
		filename: string
		thumbnailURL: string
		url: string
	}
	has_default_surface?: boolean
	id: string
	is_unlisted?: boolean
	publishedAt: string
	slug: string
	status: string
	title: string
	updatedAt: string
}

/* * */
