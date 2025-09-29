/* * */

/**
 * Remove all cookies from the browser by setting their expiration date to the past.
 * This is the only way to remove cookies from the browser.
 */
export const expireAllCookies = () => {
	document.cookie.split(';').forEach((cookie) => {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	});
};
