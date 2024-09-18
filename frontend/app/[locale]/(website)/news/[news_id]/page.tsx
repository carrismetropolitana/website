/* * */

import SinglePage from 'components/news/SinglePage';

/* * */

export default function Page({ params: { news_id } }: { params: { news_id: string } }) {
	return <SinglePage newsId={news_id} />;
}
