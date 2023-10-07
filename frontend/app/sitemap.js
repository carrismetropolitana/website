//

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
      url: `${baseUrl}/stops/${stopData.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    };
  });

  //
  // D. Return sitemap

  return [
    {
      url: `${baseUrl}/encm`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/stops`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...allStopsAsPages,
  ];

  //
}
