/* * */

import NewsPage from 'components/news/Page';

/* * */

export default function Page({ params: { news_id } }) {
	return <NewsPage news_id={news_id} />;
}
