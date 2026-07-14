import type { Metadata } from 'next';

import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getResultByLetter } from '../../data';
import { QUIZ_BASE_PATH, SITE_URL } from '../../siteConfig';

interface PageProps {
	params: Promise<{
		letter: string
	}>
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { letter } = await params;
	const result = getResultByLetter(letter);

	if (!result) {
		return {
			description:
        'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',
			title: 'Quiz Arrábida 365',
		};
	}

	const lowerLetter = result.letter.toLowerCase();

	const resultUrl
    = `${SITE_URL}${QUIZ_BASE_PATH}/resultado/${lowerLetter}`;

	const ogImageUrl
    = `${SITE_URL}${QUIZ_BASE_PATH}/resultado/${lowerLetter}/opengraph-image`;

	return {
		description:
      'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

		openGraph: {
			description:
        'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

			images: [
				{
					alt: `Resultado do quiz: ${result.title}`,
					height: 630,
					url: ogImageUrl,
					width: 1200,
				},
			],

			siteName: 'Arrábida 365',
			title: `Sou ${result.title} | Quiz Arrábida 365`,
			type: 'website',

			url: resultUrl,
		},

		title: `Sou ${result.title} | Quiz Arrábida 365`,

		twitter: {
			card: 'summary_large_image',

			description:
        'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

			images: [ogImageUrl],

			title: `Sou ${result.title} | Quiz Arrábida 365`,
		},
	};
}

export default async function SharedResultPage({
	params,
}: PageProps) {
	const { letter } = await params;
	const result = getResultByLetter(letter);

	if (!result) {
		notFound();
	}

	const headersList = await headers();

	const userAgent
    = headersList.get('user-agent')?.toLowerCase() || '';

	const isPreviewBot
    = userAgent.includes('whatsapp')
      || userAgent.includes('facebookexternalhit')
      || userAgent.includes('facebot')
      || userAgent.includes('meta-externalagent')
      || userAgent.includes('meta-externalfetcher')
      || userAgent.includes('twitterbot')
      || userAgent.includes('linkedinbot')
      || userAgent.includes('telegrambot')
      || userAgent.includes('slackbot')
      || userAgent.includes('discordbot')
      || userAgent.includes('pinterestbot');

	if (!isPreviewBot) {
		redirect(QUIZ_BASE_PATH);
	}

	return null;
}
