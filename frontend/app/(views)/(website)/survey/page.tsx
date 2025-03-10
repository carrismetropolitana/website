/* * */

import { SurveyPage } from '@/components/survey/SurveyPage';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Explore a verdadeira dimensão da CMetropolitana em 2024.',
	title: 'CMetropolitana | Inquérito 2024',
};

/* * */
export default function Page() {
	return <SurveyPage />;
}
