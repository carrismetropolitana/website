/* eslint-disable @typescript-eslint/no-explicit-any */
/* * */

import { getImageId } from '@/utils/media';

/* * */

function preservePopulatedObject(oldValue: any, newValue: any): boolean {
	const isId = typeof newValue === 'string' || typeof newValue === 'number';
	const hasPopulatedObject = oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue);
	return Boolean(isId && hasPopulatedObject);
}

/**
 * Merge image arrays, preserving full objects when we have them
 */
function mergeImageArray(oldItems: any[], newItems: any[]): any[] {
	return newItems.map((item) => {
		const itemId = getImageId(item);
		if (!itemId) return item;

		const matched = oldItems.find(old => getImageId(old) === itemId);
		if (!matched) return item;

		if (typeof item === 'string' || typeof item === 'number') return matched;
		if (typeof matched === 'object' && typeof item === 'object') {
			return deepMerge(matched, item, 'images');
		}
		return matched;
	});
}

/**
 * Deep merge two values, preserving populated relations when new value is an ID
 */
export function deepMerge(oldValue: any, newValue: any, path = ''): any {
	if (preservePopulatedObject(oldValue, newValue)) return oldValue;

	if (Array.isArray(newValue) && Array.isArray(oldValue)) {
		if (path.includes('images') || path.includes('gallery')) {
			return mergeImageArray(oldValue, newValue);
		}

		return newValue.map((item, index) => {
			const oldItem = oldValue[index];
			if (item && typeof item === 'object' && oldItem && typeof oldItem === 'object') {
				return deepMerge(oldItem, item, `${path}[${index}]`);
			}
			if ((typeof item === 'string' || typeof item === 'number') && oldItem && typeof oldItem === 'object') {
				return oldItem;
			}
			return item;
		});
	}

	if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
		if (oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {
			const merged = { ...oldValue };
			for (const key of Object.keys(newValue)) {
				const mergePath = path ? `${path}.${key}` : key;
				merged[key] = key === 'images' && path.includes('fields')
					? deepMerge(oldValue[key], newValue[key], mergePath)
					: deepMerge(oldValue[key], newValue[key], mergePath);
			}
			return merged;
		}
	}

	return newValue;
}

/**
 * Merge form data with initial data, with special handling for Lexical body
 */
export function mergeData(initialData: any, formData: any): any {
	if (!formData) return initialData;
	if (!initialData) return formData;

	const merged = { ...initialData };

	for (const key of Object.keys(formData)) {
		const newValue = formData[key];
		const oldValue = initialData[key];

		if (key === 'body' && oldValue && newValue) {
			const oldBody = typeof oldValue === 'string' ? JSON.parse(oldValue) : oldValue;
			const newBody = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;

			if (oldBody?.root && newBody?.root) {
				merged[key] = { ...newBody, root: deepMerge(oldBody.root, newBody.root, 'body.root') };
				continue;
			}
			if (oldBody && (!newBody || !newBody.root)) {
				merged[key] = oldValue;
				continue;
			}
		}

		if (key === 'layout' && Array.isArray(oldValue) && Array.isArray(newValue)) {
			merged[key] = newValue.map((item, index) => {
				const oldItem = oldValue[index];
				if (item && typeof item === 'object' && oldItem && typeof oldItem === 'object') {
					return deepMerge(oldItem, item, `layout[${index}]`);
				}
				return item;
			});
			continue;
		}

		merged[key] = deepMerge(oldValue, newValue, key);
	}

	return merged;
}
