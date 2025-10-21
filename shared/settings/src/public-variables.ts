/* * */

import { type Environment, getCurrentEnvironment } from '@/environment.js';

/**
 * This file contains a list of public variables
 * to be used in other applications from this repo.
 */
export const PUBLIC_VARIABLES = Object.freeze({

	api_url: {
		development: 'http://127.0.0.1:5050',
		production: 'https://api.carrismetropolitana.pt/v2',
		staging: 'https://api.carrismetropolitana.pt/v2',
	},

	server_url_backoffice: {
		development: 'http://localhost:49001',
		production: 'https://carrismetropolitana.pt',
		staging: 'https://staging.carrismetropolitana.pt',
	},

	server_url_frontend: {
		development: 'http://localhost:49002',
		production: 'https://carrismetropolitana.pt',
		staging: 'https://staging.carrismetropolitana.pt',
	},

	server_url_pips: {
		development: 'http://localhost:49004',
		production: 'https://carrismetropolitana.pt',
		staging: 'https://staging.carrismetropolitana.pt',
	},

	server_url_schools: {
		development: 'http://localhost:49003',
		production: 'https://carrismetropolitana.pt',
		staging: 'https://staging.carrismetropolitana.pt',
	},

});

/**
 * Get values for a given public variable and environment.
 * @param key The variable key
 * @param environment The environment to get the URL for. If not provided, it will use the ENVIRONMENT environment variable.
 * @returns The variable value for the given key and environment
 */
export function getPublicVariable(key: keyof typeof PUBLIC_VARIABLES, environment?: Environment): string {
	// Get the desired variable object
	const variableObject = PUBLIC_VARIABLES[key];
	if (!variableObject) throw new Error(`Public Variable for key=${key} not found.`);
	// Extract the current app environment either from the parameter
	// or automatically from the set environment variable.
	const currentEnvironment = environment || getCurrentEnvironment();
	// Get the base URL for the current environment
	const variableValue = variableObject[currentEnvironment as keyof typeof variableObject];
	if (!variableValue) throw new Error(`Variable value for environment=${currentEnvironment} not found.`);
	// Return the value
	return variableValue;
}
