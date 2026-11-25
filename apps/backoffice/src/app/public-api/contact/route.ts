/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

const MAX_BODY_BYTES = 32 * 1024; // 32 KB

const MAX_FIELD_LENGTHS = {
	email: 254,
	message: 5000,
	name: 100,
	organization: 200,
	phone: 15,
	subject: 200,
	surname: 100,
} as const;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitEntry {
	count: number
	resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/* * */

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&#39;');
}

function sanitizeHeaderValue(value: string): string {
	// Prevent CRLF header injection in email subjects / addresses
	return value.replace(/[\r\n\0]/g, '').trim();
}

function isValidEmail(email: string): boolean {
	if (email.length > MAX_FIELD_LENGTHS.email) return false;
	// Reject characters that confuse address parsers (display-name, multi-recipient, quoting)
	if (/[\s,<">\\()]/.test(email)) return false;
	// Strict structure: local@domain with at least one dot in the domain
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}

function getClientIp(request: Request): string {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim();
		if (first) return first;
	}
	return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function pruneExpiredRateLimits(now: number) {
	if (rateLimitStore.size < 500) return;
	for (const [key, entry] of rateLimitStore) {
		if (now >= entry.resetAt) rateLimitStore.delete(key);
	}
}

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	pruneExpiredRateLimits(now);

	const entry = rateLimitStore.get(ip);

	if (!entry || now >= entry.resetAt) {
		rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return false;
	}

	if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
		return true;
	}

	entry.count += 1;
	return false;
}

function asTrimmedString(value: unknown): null | string {
	if (typeof value !== 'string') return null;
	return value.trim();
}

function exceedsMaxLength(value: string, max: number): boolean {
	return value.length > max;
}

/* * */

export async function POST(request: Request) {
	//

	//
	// A. Guard: body size and rate limit

	const contentLength = Number(request.headers.get('content-length') || '0');

	if (contentLength > MAX_BODY_BYTES) {
		return Response.json(
			{ error: 'Pedido demasiado grande.', success: false },
			{ headers: getPublicHeaders(null), status: 413 },
		);
	}

	const clientIp = getClientIp(request);

	if (isRateLimited(clientIp)) {
		return Response.json(
			{ error: 'Demasiados pedidos. Por favor tente novamente mais tarde.', success: false },
			{ headers: getPublicHeaders(null), status: 429 },
		);
	}

	try {
		//
		// B. Parse the incoming request body

		const rawBody = await request.text();
		if (rawBody.length > MAX_BODY_BYTES) {
			return Response.json(
				{ error: 'Pedido demasiado grande.', success: false },
				{ headers: getPublicHeaders(null), status: 413 },
			);
		}

		let requestBody: Record<string, unknown>;

		try {
			requestBody = JSON.parse(rawBody) as Record<string, unknown>;
		}
		catch {
			return Response.json(
				{ error: 'Pedido inválido.', success: false },
				{ headers: getPublicHeaders(null), status: 400 },
			);
		}

		//
		// C. Validate required fields

		const name = asTrimmedString(requestBody.name);
		const surname = asTrimmedString(requestBody.surname);
		const email = asTrimmedString(requestBody.email);
		const organization = asTrimmedString(requestBody.organization);
		const subject = asTrimmedString(requestBody.subject);
		const message = asTrimmedString(requestBody.message);
		const phone = asTrimmedString(requestBody.phone) || '';

		if (!name || !surname || !email || !organization || !subject || !message) {
			return Response.json(
				{ error: 'Todos os campos obrigatórios devem ser preenchidos.', success: false },
				{ headers: getPublicHeaders(null), status: 400 },
			);
		}

		if (
			exceedsMaxLength(name, MAX_FIELD_LENGTHS.name)
			|| exceedsMaxLength(surname, MAX_FIELD_LENGTHS.surname)
			|| exceedsMaxLength(email, MAX_FIELD_LENGTHS.email)
			|| exceedsMaxLength(organization, MAX_FIELD_LENGTHS.organization)
			|| exceedsMaxLength(subject, MAX_FIELD_LENGTHS.subject)
			|| exceedsMaxLength(message, MAX_FIELD_LENGTHS.message)
			|| exceedsMaxLength(phone, MAX_FIELD_LENGTHS.phone)
		) {
			return Response.json(
				{ error: 'Um ou mais campos excedem o tamanho máximo permitido.', success: false },
				{ headers: getPublicHeaders(null), status: 400 },
			);
		}

		if (!isValidEmail(email)) {
			return Response.json(
				{ error: 'Por favor insira um endereço de email válido.', success: false },
				{ headers: getPublicHeaders(null), status: 400 },
			);
		}

		const safeEmail = sanitizeHeaderValue(email);
		const safeSubject = sanitizeHeaderValue(subject);
		const safeName = escapeHtml(name);
		const safeSurname = escapeHtml(surname);
		const safeOrganization = escapeHtml(organization);
		const safeMessage = escapeHtml(message);
		const safePhone = phone ? escapeHtml(phone) : '';
		const safeEmailHtml = escapeHtml(safeEmail);
		const safeSubjectHtml = escapeHtml(safeSubject);

		//
		// D. Setup Payload to access email functionality

		const payload = await getPayload({ config: payloadConfig });

		//
		// E. Prepare confirmation email for the user (matching the design)

		const confirmationEmailHtml = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
						line-height: 1.6;
						color: #333;
						background-color: #f5f5f5;
						margin: 0;
						padding: 20px;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						background-color: white;
						padding: 40px 20px;
					}
					.title {
						font-size: 28px;
						font-weight: 700;
						color: #000;
						margin: 0 0 30px 0;
						text-align: left;
					}
					.card {
						background-color: #ffffff;
						border: 1px solid #e0e0e0;
						border-radius: 16px;
						padding: 32px;
						margin: 0;
					}
					.card-title {
						font-size: 20px;
						font-weight: 700;
						color: #000;
						margin: 0 0 24px 0;
						line-height: 1.3;
					}
					.greeting {
						font-size: 16px;
						color: #333;
						margin: 0 0 16px 0;
					}
					.message-text {
						font-size: 16px;
						color: #333;
						margin: 0 0 16px 0;
						line-height: 1.6;
					}
					.signature {
						font-size: 16px;
						color: #333;
						margin: 24px 0 0 0;
					}
					.signature-line {
						margin: 4px 0;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1 class="title">E-mail de Confirmação</h1>

					<div class="card">
						<h2 class="card-title">Confirmação de Recebimento<br>do Seu Contacto</h2>

						<p class="greeting">Caro(a) <strong>${safeName}</strong>,</p>

						<p class="message-text">
							Agradecemos o seu contacto, a nossa equipa irá dar resposta, assim que possível.
						</p>

						<div class="signature">
							<p class="signature-line">Atenciosamente,</p>
							<p class="signature-line"><strong>Carris Metropolitana</strong></p>
						</div>
					</div>
				</div>
			</body>
			</html>
		`;

		const confirmationEmailText = `
E-mail de Confirmação

Confirmação de Recebimento do Seu Contacto

Caro(a) ${name},

Agradecemos o seu contacto, a nossa equipa irá dar resposta, assim que possível.

Atenciosamente,
Carris Metropolitana
		`;

		//
		// F. Prepare notification email for admin with form data

		const adminNotificationHtml = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #007AFF; color: white; padding: 20px; text-align: center; }
					.content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
					.field { margin-bottom: 15px; }
					.label { font-weight: bold; color: #555; }
					.value { color: #333; }
					.footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Nova Mensagem de Contacto - Imprensa</h1>
					</div>
					<div class="content">
						<div class="field">
							<span class="label">Nome:</span>
							<span class="value">${safeName} ${safeSurname}</span>
						</div>
						<div class="field">
							<span class="label">Email:</span>
							<span class="value">${safeEmailHtml}</span>
						</div>
						${safePhone ? `
						<div class="field">
							<span class="label">Telefone:</span>
							<span class="value">${safePhone}</span>
						</div>
						` : ''}
						<div class="field">
							<span class="label">Organização:</span>
							<span class="value">${safeOrganization}</span>
						</div>
						<div class="field">
							<span class="label">Assunto:</span>
							<span class="value">${safeSubjectHtml}</span>
						</div>
						<div class="field">
							<span class="label">Mensagem:</span>
							<div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${safeMessage}</div>
						</div>
					</div>
					<div class="footer">
						<p>Esta mensagem foi enviada através do formulário de contacto de imprensa da Carris Metropolitana.</p>
						<p>Data: ${new Date().toLocaleString('pt-PT')}</p>
					</div>
				</div>
			</body>
			</html>
		`;

		const adminNotificationText = `
Nova Mensagem de Contacto - Imprensa

Nome: ${name} ${surname}
Email: ${safeEmail}
${safePhone ? `Telefone: ${safePhone}\n` : ''}Organização: ${organization}
Assunto: ${safeSubject}

Mensagem:
${safeMessage}

---
Data: ${new Date().toLocaleString('pt-PT')}
		`;

		//
		// G. Send confirmation email to the user

		await payload.sendEmail({
			from: process.env.EMAIL_FROM_ADDRESS || 'noreply@carrismetropolitana.pt',
			html: confirmationEmailHtml,
			subject: 'Confirmação de Recebimento - Carris Metropolitana',
			text: confirmationEmailText,
			to: safeEmail,
		});

		//
		// H. Send notification email to admin/press team

		await payload.sendEmail({
			from: process.env.EMAIL_FROM_ADDRESS || 'noreply@carrismetropolitana.pt',
			html: adminNotificationHtml,
			subject: `[Imprensa] ${safeSubject}`,
			text: adminNotificationText,
			to: process.env.PRESS_CONTACT_EMAIL || 'comunicacao@carrismetropolitana.pt',
		});

		//
		// I. Return success response

		return Response.json(
			{ message: 'Mensagem enviada com sucesso! Entraremos em contacto em breve.', success: true },
			{ headers: getPublicHeaders(null), status: 200 },
		);
	}
	catch (error) {
		console.error('Error sending press contact email:', error);
		return Response.json(
			{ error: 'Erro ao enviar mensagem. Por favor tente novamente mais tarde.', success: false },
			{ headers: getPublicHeaders(null), status: 500 },
		);
	}

	//
}
