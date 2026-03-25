/* * */

/**
 * Preview path stringifies `body` via transformCampaignPayloadData; SWR returns `body` as a
 * nested object. Deep-clone through JSON so Lexical + processBodyImages see the same shape.
 */
export function parseCampaignBody(body: unknown): unknown {
	if (body == null) return null;
	try {
		if (typeof body === 'string') return JSON.parse(body);
		if (typeof body === 'object') return JSON.parse(JSON.stringify(body));
	}
	catch {
		return null;
	}
	return null;
}
