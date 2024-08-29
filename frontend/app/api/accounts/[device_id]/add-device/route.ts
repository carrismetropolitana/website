/* eslint-disable @typescript-eslint/no-explicit-any */
import { IJwt } from '@/types/jwt.types';
import { generateJWT, verifyJWT } from '@/utils/jwt';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

async function fetchAddDeviceAPI(token: string) {
	return fetch(`${process.env.ACCOUNTS_API_URL}/v1/accounts/add-device`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method: 'POST',
	});
}

interface AddDeviceParams {
	device_id: string
}

export async function POST(req: NextRequest, { params }: { params: AddDeviceParams }) {
	const headersList = headers();
	const authorizationHeader = headersList.get('Authorization');
	const { device_id } = params;

	// Check if the request has an Authorization header
	// If not, return a 401 Unauthorized status code
	const token = authorizationHeader?.split(' ')[1];
	if (!token || token.length === 0) {
		return Response.json({ message: 'Missing Authorization Header.' }, { status: 401 });
	}

	if (!device_id) {
		return Response.json({ message: 'Missing required parameters.' }, { status: 400 });
	}

	try {
		const decoded = await verifyJWT<IJwt>(token);

		if (!decoded) {
			return Response.json({ message: 'Invalid Authorization Token.' }, { status: 401 });
		}

		const newJwt = await generateJWT({
			device_id: device_id,
			device_id_2: decoded.device_id,
		});

		return await fetchAddDeviceAPI(newJwt);
	}
	catch (error) {
		console.log(error);
		return Response.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}
