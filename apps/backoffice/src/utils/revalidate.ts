/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

/* * */

/**
 * Trigger frontend revalidation for press notes pages
 */
export async function revalidateNotesPages(noteSlug?: string): Promise<void> {
	try {
		const frontendUrl = getPublicVariable('server_url_frontend');

		// Always revalidate the notes list page
		await fetch(`${frontendUrl}/api/revalidate?path=/press/notes&secret=${process.env.REVALIDATE_SECRET || ''}`);

		// If a specific note slug is provided, revalidate its detail page
		if (noteSlug) {
			await fetch(`${frontendUrl}/api/revalidate?path=/press/notes/${noteSlug}&secret=${process.env.REVALIDATE_SECRET || ''}`);
		}
	}
	catch (error) {
		console.error('Failed to revalidate notes pages:', error);
	}
}
