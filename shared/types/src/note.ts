/**
 * Notes are press releases and official documents that can be either
 * links to external content or downloadable files.
 */
export interface Note {

	/**
	 * The ID of the note.
	 */
	_id: string

	/**
	 * The authors of the note.
	 */
	authors?: string | { email: string, id: string }

	/**
	 * The main body content of the note (HTML string)
	 */
	body?: string

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
	 * The hero image for the note
	 */
	heroImage?: {
		alt?: string
		filename?: string
		id: string
		url?: string
	}

	/**
	 * The lead/summary text for the note (HTML string)
	 */
	lead?: string

	/**
	 * The external link if contentType is 'link'
	 */
	link?: string

	/**
	 * The date when the note was published
	 */
	publishDate: string

	/**
	 * SEO metadata for the note
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
	 * The URL slug for the note
	 */
	slug: string

	/**
	 * Tags associated with the note
	 */
	tags?: string[]

	/**
	 * The title of the note
	 */
	title: string

}
