/* * */

import CMetropolitanaLogoLight from '@/components/common/CMetropolitanaLogoLight';
import { cutStringAtLength } from '@/utils/cut-string-at-length';

/* * */

interface Props {
	description: string
	title: string

}

/* * */

export function OpenGraphAlertsDynamic({ description, title }: Props) {
	return (
		<div style={{ alignItems: 'flex-start', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: 50, width: '100%' }}>
			<div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<CMetropolitanaLogoLight height={130} />
			</div>
			<div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'flex-start', marginBottom: 40, marginLeft: 15, marginTop: 70 }}>
				<div style={{ borderRadius: 999, color: '#000', display: 'flex', fontSize: 55, fontWeight: 700, lineHeight: 1.1 }}>
					{cutStringAtLength(title, 60)}
				</div>
				<div style={{ borderRadius: 999, color: '#919191', display: 'flex', fontSize: 50, fontWeight: 600, lineHeight: 1.1 }}>
					{cutStringAtLength(description, 60)}
				</div>
			</div>
		</div>
	);
}
