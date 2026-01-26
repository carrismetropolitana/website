/* * */

import { RegularListItem } from '@/components/layout/RegularListItem';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';

import { Review2025CardSchemaContentItemLine } from '../_data/cards';

/* * */

export default function Review2025ContentItemLineItem({ item }: { item: Review2025CardSchemaContentItemLine }) {
	//

	const { actions } = useLinesContext();

	//

	return (
		<RegularListItem key={item.line_id} href={`/lines/${item.line_id}`} style={{ borderBottom: 'none', borderRadius: 'var(--border-radius-sm)', padding: 'var(--size-spacing-5)' }}>
			<LineDisplay lineData={actions.getLineDataById(String(item.line_id))} size="md" />
		</RegularListItem>
	);
}
