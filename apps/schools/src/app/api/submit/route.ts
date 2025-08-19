/* * */

import { transformDataForGoogleSheets } from '@/form/gsheets-transform';
import { updateSchoolFormSchema } from '@/form/schema';
import { SchoolData } from '@/types/school';
import { google } from 'googleapis';

/* * */

export async function POST(request: Request) {
	//

	//
	// Setup the Google Sheets API client

	if (!process.env.GOOGLE_SERVICE_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_EMAIL) {
		const responseBody = JSON.stringify({ message: 'Missing Google API service credentials.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 500 });
	}

	const googleAuthClient = new google.auth.JWT({
		email: process.env.GOOGLE_SERVICE_EMAIL,
		key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const googleSheetsService = google.sheets({ auth: googleAuthClient, version: 'v4' });

	//
	// Parse the incoming request body

	const requestBody = await request.json();

	if (!requestBody) {
		const responseBody = JSON.stringify({ message: 'Invalid request body.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 400 });
	}

	//
	// Check if the secret password is correct

	if (!process.env.FORM_PASSWORD) {
		const responseBody = JSON.stringify({ message: 'Missing FORM_PASSWORD environment variable.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 500 });
	}

	if (requestBody._password !== process.env.FORM_PASSWORD) {
		const responseBody = JSON.stringify({ message: 'Código de acesso inválido.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 403 });
	}

	//
	// Validate the data using zod schema

	const result = updateSchoolFormSchema.safeParse(requestBody);

	if (!result.success) {
		const responseBody = JSON.stringify({ message: 'A submissão contém erros e por isso não será aceite.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 400 });
	}

	//
	// Prepare the data for Google Sheets

	const allSchoolsRes = await fetch('https://api.carrismetropolitana.pt/v2/facilities/schools');
	const allSchoolsData: SchoolData[] = await allSchoolsRes.json();

	const schoolData = allSchoolsData.find(school => school.id === requestBody.id);

	const parsedValuesToTable = transformDataForGoogleSheets(requestBody.id, schoolData, result.data);

	//
	// Append the data to the Google Sheet

	try {
		await googleSheetsService.spreadsheets.values.append({
			range: 'Sheet1!A1',
			requestBody: {
				values: [parsedValuesToTable],
			},
			spreadsheetId: process.env.GOOGLE_SHEET_ID,
			valueInputOption: 'RAW',
		});
	}
	catch (error) {
		console.error('Failed to append data to Google Sheets:', error);
		const responseBody = JSON.stringify({ error: error.message, message: 'Failed to append data to Google Sheets.', success: false });
		return new Response(responseBody, { headers: { 'Content-Type': 'application/json' }, status: 500 });
	}

	//
	// Return success response

	const responseBody = JSON.stringify({ message: 'Formulário recebido com sucesso!', success: true });
	return new Response(responseBody, { status: 200 });

	//
}
