/* * */

import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';

import { Review2025CardContentGroupLineItem } from '../_data/cards';

/* * */

export default function Review2025GroupBadgeItem({ item }: { item: Review2025CardContentGroupLineItem }) {
	//

	const { actions } = useLinesContext();

	//

	return (
		<LineDisplay lineData={actions.getLineDataById(String(item.line_id))} />
	);
}
