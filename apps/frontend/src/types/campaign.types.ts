/* * */

export interface CampaignLayoutBlock {
	blockType: 'spacer' | 'three-columns-text' | 'two-columns-text' | 'two-columns-text-image'
	centerColumn?: unknown
	height?: number
	id?: string
	image?: number | { filename?: string, id?: string, url?: string }
	imagePosition?: 'left' | 'right'
	leftColumn?: unknown
	rightColumn?: unknown
	text?: unknown
}

export interface CampaignData {
	id: string
	layout?: CampaignLayoutBlock[]
	slug: string
	status: string
	title: string
	updatedAt: string
}
