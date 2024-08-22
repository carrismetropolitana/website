interface FavoriteStopParams {
	device_id: string
}

/* * */
export async function POST(req, { params }: { params: FavoriteStopParams }) {
	const { device_id } = params;

	const url = `${process.env.ACCOUNTS_API_URL}/v1/accounts/${device_id}/favorite-lines`;
	const body = await req.json();

	try {
		return await fetch(url, {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
	}
	catch (error) {
		console.log('error', error);
		return Response.json({ message: 'An error occurred while adding the favorite stop.' }, { status: 500 });
	}
}
