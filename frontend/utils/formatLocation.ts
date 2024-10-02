// format a string with the location of a stop, placing commas between names, and ignoring a name if it is the same as the last one

/**
 *
 * @deprecated
 * @param names
 * @returns
 */

export function formatLocation(names: (null | string | undefined)[]) {
	let last = '';
	let location = '';
	for (const name of names) {
		if (!name) continue;
		if (name !== last) {
			location += name + ', ';
			last = name;
		}
	}
	return location.slice(0, -2);
}
