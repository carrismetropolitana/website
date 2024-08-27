/**
 * We can query the acount API directly from the server without having to
 * go through the Next API. This makes it more convenient and safer because
 * we don't expose any of the arguments to the client.
*/

'use server';

import { Profile } from '@/types/profile.type';
import { generateJWT } from '@/utils/jwt';

/* * */

const namespace = `${process.env.ACCOUNTS_API_URL}/v1/accounts`;

/**
 * Gets the profile of a user
 *
 * @param device_id - The Device ID of the user
 * @returns Promise<Profile> - The profile of the user
*/
export async function getProfile(device_id: string): Promise<Profile> {
	const url = `${namespace}/${device_id}`;
	const auth = await generateJWT({ device_id });

	const res = await fetch(url, {
		headers: {
			'Authorization': `Bearer ${auth}`,
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error('An error occurred while fetching the profile.');
	}

	return await res.json() as Profile;
}

/**
 * Updates the profile of a user
 *
 * @param profile - The updated profile
 * @param device_id - The Device ID of the user
 * @returns Promise<Profile> - The updated profile
*/
export async function updateProfile(profile: Partial<Profile>, device_id: string): Promise<Profile> {
	const url = `${namespace}/${device_id}`;
	const body = JSON.stringify(profile);
	const auth = await generateJWT({ device_id });

	const res = await fetch(url, {
		body,
		headers: {
			'Authorization': `Bearer ${auth}`,
			'Content-Type': 'application/json',
		},
		method: 'PUT',
	});

	if (!res.ok) {
		throw new Error('An error occurred while updating the profile.');
	}

	return await res.json() as Profile;
}

/**
 * Toogles the favorite status of a Line
 *
 * @param line_id - The ID of the line to be favorited
 * @param device_id  - The Device ID of the user
 * @returns Promise<boolean> - Whether the operation was successful or not
 */
export async function toggleFavoriteLine(line_id: string, device_id: string): Promise<Profile> {
	const url = `${namespace}/${device_id}/favorite-lines/${line_id}`;
	const options = {
		headers: {
			Authorization: `Bearer ${await generateJWT({ device_id })}`,
		},
		method: 'POST',
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('An error occurred while toggling the favorite status of the line.');
	}

	return await res.json() as Profile;
}

/**
 * Toogles the favorite status of a Stop
 *
 * @param stop_id - The ID of the stop to be favorited
 * @param device_id  - The Device ID of the user
 * @returns Promise<boolean> - Whether the operation was successful or not
 */
export async function toggleFavoriteStop(stop_id: string, device_id: string): Promise<Profile> {
	const url = `${namespace}/${device_id}/favorite-stops/${stop_id}`;
	const options = {
		headers: {
			Authorization: `Bearer ${await generateJWT({ device_id })}`,
		},
		method: 'POST',
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('An error occurred while toggling the favorite status of the stop.');
	}

	return await res.json() as Profile;
}
