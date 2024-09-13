/* * */

export async function GET() {
	//

	const allNewsData = await fetch('https://www.carrismetropolitana.pt/wp-json/wp/v2/noticia?per_page=100').then(res => res.json());

	if (!allNewsData) return Response.json([], { status: 500, statusText: 'Unable to fetch news data' });

	const allNewsDataFormatted = [];

	for (const newsData of allNewsData) {
		//

		const featuredImageMediaData = await fetch(`https://www.carrismetropolitana.pt/wp-json/wp/v2/media/${newsData.featured_media}`).then(res => res.json());

		allNewsDataFormatted.push({
			_id: newsData.id,
			content: newsData.content.rendered,
			cover_image_src: featuredImageMediaData?.source_url,
			publish_date: newsData.date,
			title: newsData.title.rendered,
		});

		//
	}

	return Response.json(allNewsDataFormatted);

	//
}
