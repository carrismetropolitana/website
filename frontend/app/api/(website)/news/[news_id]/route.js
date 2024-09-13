/* * */

export async function GET(_, { params }) {
	//

	const newsData = await fetch(`https://www.carrismetropolitana.pt/wp-json/wp/v2/noticia/${params.news_id}`).then(res => res.json());

	if (!newsData) return Response.json([], { status: 500, statusText: 'Unable to fetch news data' });

	const featuredImageMediaData = await fetch(`https://www.carrismetropolitana.pt/wp-json/wp/v2/media/${newsData.featured_media}`).then(res => res.json());

	const newsDataFormatted = {
		_id: newsData.id,
		content: newsData.content.rendered,
		cover_image_src: featuredImageMediaData?.source_url,
		publish_date: newsData.date,
		title: newsData.title.rendered,
	};

	return Response.json(newsDataFormatted);

	//
}
