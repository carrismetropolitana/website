/**
 * We can query the acount API directly from the server without having to
 * go through the Next API. This makes it more convenient and safer because
 * we don't expose any of the arguments to the client.
*/

'use server';

import { ServerActionResult } from '@/types/actions.types';
import { Profile } from '@/types/profile.type';
// import { Profile } from '@/types/profile.type';
import { generateJWT } from '@/utils/jwt';

/* * */

const namespace = `${process.env.ACCOUNTS_API_URL}/v1/accounts`;

/**
 * Gets the profile of a user
 *
 * @param device_id - The Device ID of the user
 * @returns Promise<ServerActionResult<Profile>> - The profile of the user
*/
export async function getProfile(device_id: string): Promise<ServerActionResult<Profile>> {
	const url = `${namespace}/${device_id}`;
	const auth = await generateJWT({ device_id });

	try {
		const res = await fetch(url, {
			headers: {
				'Authorization': `Bearer ${auth}`,
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			return { error: res.statusText, success: false };
		}

		const profile = await res.json() as Profile;
		return { success: true, value: profile };
	}
	catch (error) {
		return { error: error.message, success: false };
	}
}

/**
 * Updates the profile of a user
 *
 * @param profile - The updated profile
 * @param device_id - The Device ID of the user
 * @returns Promise<ServerActionResult<Profile>> - The updated profile
*/
export async function updateProfile(profile: Partial<Profile>, device_id: string): Promise<ServerActionResult<Profile>> {
	const url = `${namespace}/${device_id}`;
	const body = JSON.stringify(profile);
	const auth = await generateJWT({ device_id });

	try {
		const res = await fetch(url, {
			body,
			headers: {
				'Authorization': `Bearer ${auth}`,
				'Content-Type': 'application/json',
			},
			method: 'PUT',
		});

		if (!res.ok) {
			return { error: res.statusText, success: false };
		}

		const updatedProfile = await res.json() as Profile;
		return { success: true, value: updatedProfile };
	}
	catch (error) {
		return { error: error.message, success: false };
	}
}

/**
 * Toogles the favorite status of a Line
 *
 * @param line_id - The ID of the line to be favorited
 * @param device_id  - The Device ID of the user
 * @returns Promise<boolean> - Whether the operation was successful or not
 */
export async function toggleFavoriteLine(line_id: string, device_id: string): Promise<ServerActionResult<Profile>> {
	const url = `${namespace}/${device_id}/favorite-lines/${line_id}`;
	const options = {
		headers: {
			Authorization: `Bearer ${await generateJWT({ device_id })}`,
		},
		method: 'POST',
	};

	try {
		const res = await fetch(url, options);

		if (!res.ok) {
			return { error: res.statusText, success: false };
		}

		const profile = await res.json() as Profile;
		return { success: true, value: profile };
	}
	catch (error) {
		return { error: error.message, success: false };
	}
}

/**
 * Toogles the favorite status of a Stop
 *
 * @param stop_id - The ID of the stop to be favorited
 * @param device_id  - The Device ID of the user
 * @returns Promise<boolean> - Whether the operation was successful or not
 */
export async function toggleFavoriteStop(stop_id: string, device_id: string): Promise<ServerActionResult<Profile>> {
	const url = `${namespace}/${device_id}/favorite-stops/${stop_id}`;
	const options = {
		headers: {
			Authorization: `Bearer ${await generateJWT({ device_id })}`,
		},
		method: 'POST',
	};

	try {
		const res = await fetch(url, options);

		if (!res.ok) {
			return { error: res.statusText, success: false };
		}

		const profile = await res.json() as Profile;
		return { success: true, value: profile };
	}
	catch (error) {
		return { error: error.message, success: false };
	}
}

/**
 * Merge devices
 * Merges the device data of the user with the device data of the server
 *
 * @param device_id - The Device ID of the user
 * @returns Promise<ServerActionResult<Profile>> - The merged profile
 */
export async function mergeDevices(device_id: null | string, device_id_2: null | string): Promise<ServerActionResult<Profile>> {
	const url = `${namespace}/add-device`;
	const auth = await generateJWT({ device_id, device_id_2 });

	try {
		console.log(auth);
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${auth}`,
			},
			method: 'POST',
		});

		if (!res.ok) {
			return { error: res.statusText, success: false };
		}

		const profile = await res.json() as Profile;
		return { success: true, value: profile };
	}
	catch (error) {
		return { error: error.message, success: false };
	}
}
