export interface LexicalNode {
	children?: LexicalNode[]
	direction?: 'ltr' | 'rtl'
	fields?: {
		accordion?: {
			content?: string
			id?: string
			title?: string
		}[]
		blockName?: string
		blockType?: string
		caption?: string
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		images?: {
			relationTo?: string
			value?: {
				filename?: string
				height?: number
				id?: string
				mimeType?: string
				url?: string
				width?: number
			}
		}[]
		linkType?: string
		newTab?: boolean
		source?: 'external' | 'upload'
		title?: string
		video?: {
			relationTo?: string
			value?: {
				filename?: string
				id?: string
				mimeType?: string
				url?: string
			}
		}
		videoUrl?: string
	}
	format?: number
	id?: string
	label?: string
	listType?: 'bullet' | 'number'
	mentionType?: string
	relationTo?: string
	style?: string
	tag?: string
	text?: string
	type?: string
	url?: string
	value?: number | {
		createdAt?: string
		filename?: string
		filesize?: number
		focalX?: number
		focalY?: number
		height?: number
		id?: string
		mimeType?: string
		thumbnailURL?: null | string
		updatedAt?: string
		url?: string
		width?: number
	}
}
