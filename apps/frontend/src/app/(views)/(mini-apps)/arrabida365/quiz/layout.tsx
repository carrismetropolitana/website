import type { Metadata } from 'next';

import { SITE_URL, QUIZ_BASE_PATH } from './siteConfig';

const quizUrl = `${SITE_URL}${QUIZ_BASE_PATH}`;
const defaultOgImage = `${quizUrl}/opengraph-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Quiz Arrábida 365',

  description:
    'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

  openGraph: {
    title: 'Quiz Arrábida 365',

    description:
      'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

    url: quizUrl,

    siteName: 'Arrábida 365',

    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Quiz Arrábida 365',
      },
    ],

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Quiz Arrábida 365',

    description:
      'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

    images: [defaultOgImage],
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}