/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import jwt from 'jsonwebtoken';

/**
 * Generates JWT token
 *
 * @param payload The payload to encode in the token
 * @param expiresIn The expiration time of the token in seconds
 * @returns The encoded token
 */
export async function generateJWT(payload: Record<string, any>, expiresIn: number | string = '5m'): Promise<string> {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		algorithm: 'HS256',
		expiresIn,
	});

	return token;
}

/**
 * Verifies a JWT token
 *
 * @param token The token to verify
 * @returns The decoded token
 */
export async function verifyJWT<T = Record<string, any>>(token: string): Promise<T | null> {
	try {
		return jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] }) as T;
	}
	catch (error) {
		console.error('Error verifying JWT:', error);
		return null;
	}
}
