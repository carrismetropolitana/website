export interface LexicalRichText {
	root: {
		children: LexicalNode[]
		direction?: 'ltr' | 'rtl'
		format?: string
		indent?: number
		type: 'root'
		version: number
	}
}

export interface LexicalNode {
	children?: LexicalNode[]
	direction?: 'ltr' | 'rtl'
	fields?: {
		accordion?: {
			content?: LexicalRichText | string
			id?: string
			title?: string
		}[]
		backgroundImage?: number | {
			file?: { url?: string }
			url?: string
			value?: {
				file?: { url?: string }
				url?: string
			}
		}
		backgroundOverlay?: boolean
		blockName?: string
		blockType?: string
		borderColor?: string
		buttonColor?: string
		buttonTextColor?: string
		caption?: string
		cards?: {
			description?: string
			image?: RelationshipMedia
			number?: string
			title?: string
		}[]
		centerColumn?: LexicalRichText | string
		content?: LexicalRichText | string
		doc?: {
			relationTo?: string
			value?: { slug?: string }
		}
		forceOverflow?: boolean
		fullHeight?: boolean
		hasBackgroundImage?: boolean
		height?: number
		image?: RelationshipMedia
		imagePosition?: 'left' | 'right'
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
		isButton?: boolean
		leftColumn?: LexicalRichText | string
		linkType?: string
		newTab?: boolean
		number?: string
		primaryColor?: string
		rightColumn?: LexicalRichText | string
		source?: 'external' | 'upload'
		text?: LexicalRichText | string
		textColor?: string
		title?: string
		titleColor?: string
		url?: string
		variant?: 'alerts' | 'brand2' | 'brand' | 'debug' | 'default' | 'muted' | 'persistent' | 'standout' | 'success' | 'warning'
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
		withBottomDivider?: boolean
		withGap?: boolean
		withPadding?: 'all' | 'desktop' | 'mobile' | 'none'
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
		alt?: string
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

export interface RelationshipMedia {
	alt?: string
	file?: { url?: string }
	filename?: string
	id?: string
	url?: string
	value?: { url?: string }
}
