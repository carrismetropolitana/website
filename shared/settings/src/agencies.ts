/* * */

export const CARRIS_METROPOLITANA_AGENCY_IDS = Object.freeze(['LA77N', 'BNA17', 'YA15B', 'A2L1N', '41', '42', '43', '44'] as const);

export const CARRIS_METROPOLITANA_NUMERIC_AGENCY_IDS: Readonly<Record<string, string>> = Object.freeze({
	A2L1N: '44',
	BNA17: '42',
	LA77N: '41',
	YA15B: '43',
});

export type CarrisMetropolitanaAgencyId = typeof CARRIS_METROPOLITANA_AGENCY_IDS[number];
