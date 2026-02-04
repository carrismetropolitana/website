'use client';
/* * */

import { LineDisplay } from '@/components/lines/LineDisplay';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useLinesContext } from '@/contexts/Lines.context';
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
	const linesContext = useLinesContext();
	const router = useRouter();

	//
	// B. Handle actions

	const handleLineClick = (e: React.MouseEvent, lineId: string) => {
		e.preventDefault();
		const lineHref = environmentContext.actions.getNormalizedHref(`/lines/${lineId}`);
		router.push(lineHref);
	};

	//
	// C. Render components

	if (mentionType === 'line' && id) {
		const lineHref = environmentContext.actions.getNormalizedHref(`/lines/${id}`);
		const lineData = linesContext.actions.getLineDataById(id);

		return (
			<span style={{ display: 'inline-block', lineHeight: 0, verticalAlign: 'middle' }}>
				<a href={lineHref} onClick={e => handleLineClick(e, id)} style={{ color: 'inherit', textDecoration: 'none' }}>
					<LineDisplay lineData={lineData} size="md" />
				</a>
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
