/* * */

export default async function sitemap() {
	//

	//
	// A. Setup variables

	const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://0.0.0.0:${process.env.PORT || 3000}`;

	//
	// B. Fetch data

	const allStopsResponse = await fetch('https://api.carrismetropolitana.pt/stops');
	const allStopsData = await allStopsResponse.json();

	//
	// C. Transform data

	const allStopsAsPages = allStopsData.map((stopData) => {
		return {
			changeFrequency: 'daily',
			lastModified: (new Date()),
			priority: 1,
			url: `${baseUrl}/stops/${stopData.id}`,
		};
	});

	//
	// D. Return sitemap

	return [
		{
			changeFrequency: 'always',
			lastModified: (new Date()),
			priority: 1,
			url: `${baseUrl}/encm`,
		},
		{
			changeFrequency: 'daily',
			lastModified: (new Date()),
			priority: 1,
			url: `${baseUrl}/stops`,
		},
		...allStopsAsPages,
	];

	//
}
