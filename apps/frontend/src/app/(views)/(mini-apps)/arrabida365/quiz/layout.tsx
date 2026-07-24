import type { Metadata } from 'next';

import { QUIZ_BASE_PATH, SITE_URL } from './siteConfig';

const quizUrl = `${SITE_URL}${QUIZ_BASE_PATH}`;
const defaultOgImage = `${quizUrl}/opengraph-image.jpg`;

export const metadata: Metadata = {
	description:
    'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

	metadataBase: new URL(SITE_URL),

	openGraph: {
		description:
      'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

		images: [
			{
				alt: 'Quiz Arrábida 365',
				height: 630,
				url: defaultOgImage,
				width: 1200,
			},
		],

		siteName: 'Arrábida 365',

		title: 'Quiz Arrábida 365',

		type: 'website',

		url: quizUrl,
	},

	title: 'Quiz Arrábida 365',

	twitter: {
		card: 'summary_large_image',

		description:
      'Descobre o teu perfil de passageiro da Arrábida 365 e encontra o percurso de verão ideal para ti.',

		images: [defaultOgImage],

		title: 'Quiz Arrábida 365',
	},
};

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>;
}
