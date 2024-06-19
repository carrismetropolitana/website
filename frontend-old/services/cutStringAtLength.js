/* * */
/* cutStringAtLength */
/* Explanation needed. */
/* * */

export default function cutStringAtLength(string, length) {
	if (string && string.length > length) return `${string.substring(0, length)}...`;
	else return string;
}
