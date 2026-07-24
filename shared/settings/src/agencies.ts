/* * */

export const CARRIS_METROPOLITANA_AGENCY_IDS = Object.freeze(['LA77N', 'BNA17', 'YA15B', 'A2L1N'] as const);

export type CarrisMetropolitanaAgencyId = typeof CARRIS_METROPOLITANA_AGENCY_IDS[number];
