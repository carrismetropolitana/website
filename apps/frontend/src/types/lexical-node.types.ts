export interface LexicalNode {
	children?: LexicalNode[]
	direction?: 'ltr' | 'rtl'
	fields?: {
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		linkType?: string
		newTab?: boolean
	}
	format?: number
	id?: string
	label?: string
	listType?: 'bullet' | 'number'
	mentionType?: string
	style?: string
	tag?: string
	text?: string
	type?: string
	url?: string
	value?: number
}
