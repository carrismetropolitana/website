/* * */

import FrontendNewsPage from 'components/FrontendNewsPage';

/* * */

export default function Page({ params: { news_id } }) {
	return <FrontendNewsPage news_id={news_id} />;
}
