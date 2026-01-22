'use client';
/* * */

import { LineBadge } from '@/components/lines/LineBadge';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useRouter } from 'next/navigation';

/* * */

interface LineMentionProps {
	id?: string
	label?: string
	mentionType?: string
}

/* * */

export function LineMention({ id = '', label = '', mentionType = 'line' }: LineMentionProps) {
	//

	//
	// A. Setup variables

	const environmentContext = useEnvironmentContext();
	const router = useRouter();

	//
	// B. Handle actions

	const handleLineBadgeClick = (lineId: string) => {
		const lineHref = environmentContext.actions.getNormalizedHref(`/lines/${lineId}`);
		router.push(lineHref);
	};

	//
	// C. Render components

	if (mentionType === 'line' && id) {
		return (
			<span style={{ display: 'inline-block', lineHeight: 0, verticalAlign: 'middle' }}>
				<LineBadge lineId={id} onClick={() => handleLineBadgeClick(id)} size="md" />
			</span>
		);
	}

	return (
		<span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
			{mentionType}:{label || id}
		</span>
	);

	//
}
