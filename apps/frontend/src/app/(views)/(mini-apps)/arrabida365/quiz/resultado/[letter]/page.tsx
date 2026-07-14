import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { SITE_URL, QUIZ_BASE_PATH } from '../../siteConfig';
import { getResultByLetter } from '../../data';

type PageProps = {
  params: Promise<{
    letter: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { letter } = await params;
  const result = getResultByLetter(letter);

  if (!result) {
    return {
      title: 'Quiz Arrábida 365',
      description:
        'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',
    };
  }

  const lowerLetter = result.letter.toLowerCase();

  const resultUrl =
    `${SITE_URL}${QUIZ_BASE_PATH}/resultado/${lowerLetter}`;

  const ogImageUrl =
    `${SITE_URL}${QUIZ_BASE_PATH}/resultado/${lowerLetter}/opengraph-image`;

  return {
    title: `Sou ${result.title} | Quiz Arrábida 365`,

    description:
      'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

    openGraph: {
      title: `Sou ${result.title} | Quiz Arrábida 365`,

      description:
        'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

      url: resultUrl,
      siteName: 'Arrábida 365',
      type: 'website',

      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Resultado do quiz: ${result.title}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',

      title: `Sou ${result.title} | Quiz Arrábida 365`,

      description:
        'Descobre o teu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',

      images: [ogImageUrl],
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

  const userAgent =
    headersList.get('user-agent')?.toLowerCase() || '';

  const isPreviewBot =
    userAgent.includes('whatsapp') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('facebot') ||
    userAgent.includes('meta-externalagent') ||
    userAgent.includes('meta-externalfetcher') ||
    userAgent.includes('twitterbot') ||
    userAgent.includes('linkedinbot') ||
    userAgent.includes('telegrambot') ||
    userAgent.includes('slackbot') ||
    userAgent.includes('discordbot') ||
    userAgent.includes('pinterestbot');

  if (!isPreviewBot) {
    redirect(QUIZ_BASE_PATH);
  }

  return null;
}