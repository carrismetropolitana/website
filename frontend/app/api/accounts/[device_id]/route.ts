interface Params {
	device_id: string
}

/* * */
export async function GET(req, { params }: { params: Params }) {
	const { device_id } = params;

	const url = `${process.env.ACCOUNTS_API_URL}/v1/accounts/${device_id}`;

	try {
		return await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},

		});
	}
	catch (error) {
		console.log('error', error);
		return Response.json({ message: 'An error occurred while adding the favorite stop.' }, { status: 500 });
	}
}

/* * */
export async function DELETE(req, { params }: { params: Params }) {
	const { device_id } = params;

	const url = `${process.env.ACCOUNTS_API_URL}/v1/accounts/${device_id}`;

	try {
		return await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
	}
	catch (error) {
		console.log('error', error);
		return Response.json({ message: 'An error occurred while adding the favorite stop.' }, { status: 500 });
	}
}

/* * */
export async function PUT(req, { params }: { params: Params }) {
	const { device_id } = params;

	const url = `${process.env.ACCOUNTS_API_URL}/v1/accounts/${device_id}`;
	const body = await req.json();

	try {
		return await fetch(url, {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
		});
	}
	catch (error) {
		console.log('error', error);
		return Response.json({ message: 'An error occurred while adding the favorite stop.' }, { status: 500 });
	}
}
