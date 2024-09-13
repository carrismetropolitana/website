/* * */

import SinglePage from 'components/news/SinglePage';

/* * */

export default function Page({ params: { news_id } }) {
	return <SinglePage newsId={news_id} />;
}
