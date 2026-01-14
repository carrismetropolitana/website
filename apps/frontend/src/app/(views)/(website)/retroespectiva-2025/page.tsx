/* * */

import { Review2025Page } from '@/components/review-2025/Review2025Page';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Explore a verdadeira dimensão da CMetropolitana em 2025.',
	title: 'CMetropolitana | Retroespectiva 2025',
};

/* * */
export default function Page() {
	return <Review2025Page />;
}
