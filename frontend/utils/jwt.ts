/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import jwt from 'jsonwebtoken';

export async function generateJWT(payload: Record<string, any>) {
	return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export async function verifyJWT(token: string) {
	return jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] });
}

export async function decodeJWT(token: string) {
	return jwt.decode(token) as Record<string, any>;
}
