/**
 * Knowledge Base items are resources like documentation, guides, and data
 * that can be either links to external content or downloadable files.
 */
export interface KnowledgeBase {

	/**
	 * The ID of the knowledge base item.
	 */
	_id: string

	/**
	 * The authors of the item.
	 */
	authors?: string | { email: string, id: string }

	/**
	 * The type of content - either a link or a file
	 */
	contentType: 'file' | 'link'

	/**
	 * The file reference if contentType is 'file'
	 */
	file?: {
		alt?: string
		filename?: string
		id: string
		mimeType?: string
		url?: string
	}

	/**
	 * The hero image for the item
	 */
	heroImage?: {
		alt?: string
		filename?: string
		id: string
		url?: string
	}

	/**
	 * The external link if contentType is 'link'
	 */
	link?: string

	/**
	 * The date when the item was published
	 */
	publishDate: string

	/**
	 * SEO metadata for the item
	 */
	seo?: {
		metaDescription?: string
		metaTitle?: string
		ogImage?: {
			alt?: string
			filename?: string
			id: string
			url?: string
		}
	}

	/**
	 * The URL slug for the item
	 */
	slug: string

	/**
	 * The title of the item
	 */
	title: string

	/**
	 * The topic/category of the item
	 */
	topic?: string

}

