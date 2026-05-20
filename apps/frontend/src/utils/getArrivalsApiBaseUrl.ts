import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

const DEBUG_ARRIVALS_API_URL = 'https://go.tmlmobilidade.pt/eta/api';

export function getArrivalsApiBaseUrl(isDebugMode: boolean): string {
	return isDebugMode ? DEBUG_ARRIVALS_API_URL : getPublicVariable('api_url');
}
