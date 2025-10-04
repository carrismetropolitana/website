/* * */

import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	//

	//
	// A. Parse the incoming request body

	try {
		const requestBody = await request.json();

		//
		// B. Validate required fields

		const { name, surname, email, organization, subject, message } = requestBody;

		if (!name || !surname || !email || !organization || !subject || !message) {
			return Response.json(
				{ error: 'Todos os campos obrigatórios devem ser preenchidos.', success: false },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return Response.json(
				{ error: 'Por favor insira um endereço de email válido.', success: false },
				{ status: 400 },
			);
		}

		//
		// C. Setup Payload to access email functionality

		const payload = await getPayload({ config: payloadConfig });

		//
		// D. Prepare confirmation email for the user (matching the design)

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
						
						<p class="greeting">Caro(a) <strong>${name}</strong>,</p>
						
						<p class="message-text">
							Recebemos a sua mensagem e a nossa equipa de comunicação está a analisá-la. 
							Entraremos em contacto consigo em breve para fornecer a assistência ou 
							informação solicitada.
						</p>
						
						<p class="message-text">
							Agradecemos o seu interesse e confiança na Carris Metropolitana.
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

Recebemos a sua mensagem e a nossa equipa de comunicação está a analisá-la. Entraremos em contacto consigo em breve para fornecer a assistência ou informação solicitada.

Agradecemos o seu interesse e confiança na Carris Metropolitana.

Atenciosamente,
Carris Metropolitana
		`;

		//
		// E. Prepare notification email for admin with form data

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
							<span class="value">${name} ${surname}</span>
						</div>
						<div class="field">
							<span class="label">Email:</span>
							<span class="value">${email}</span>
						</div>
						${requestBody.phone ? `
						<div class="field">
							<span class="label">Telefone:</span>
							<span class="value">${requestBody.phone}</span>
						</div>
						` : ''}
						<div class="field">
							<span class="label">Organização:</span>
							<span class="value">${organization}</span>
						</div>
						<div class="field">
							<span class="label">Assunto:</span>
							<span class="value">${subject}</span>
						</div>
						<div class="field">
							<span class="label">Mensagem:</span>
							<div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${message}</div>
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
Email: ${email}
${requestBody.phone ? `Telefone: ${requestBody.phone}\n` : ''}Organização: ${organization}
Assunto: ${subject}

Mensagem:
${message}

---
Data: ${new Date().toLocaleString('pt-PT')}
		`;

		//
		// F. Send confirmation email to the user

		await payload.sendEmail({
			from: process.env.EMAIL_FROM_ADDRESS || 'noreply@carrismetropolitana.pt',
			html: confirmationEmailHtml,
			subject: 'Confirmação de Recebimento - Carris Metropolitana',
			text: confirmationEmailText,
			to: email,
		});

		//
		// G. Send notification email to admin/press team

		await payload.sendEmail({
			from: process.env.EMAIL_FROM_ADDRESS || 'noreply@carrismetropolitana.pt',
			html: adminNotificationHtml,
			subject: `[Imprensa] ${subject}`,
			text: adminNotificationText,
			to: process.env.PRESS_CONTACT_EMAIL || process.env.EMAIL_FROM_ADDRESS || 'imprensa@carrismetropolitana.pt',
		});

		//
		// H. Return success response

		return Response.json(
			{ message: 'Mensagem enviada com sucesso! Entraremos em contacto em breve.', success: true },
			{ status: 200 },
		);
	}
	catch (error) {
		console.error('Error sending press contact email:', error);
		return Response.json(
			{ error: 'Erro ao enviar mensagem. Por favor tente novamente mais tarde.', success: false },
			{ status: 500 },
		);
	}

	//
}

