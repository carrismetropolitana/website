/* * */

import CMetropolitanaLogoLight from '@/components/common/CMetropolitanaLogoLight';
import FacilityIcon from '@/components/facilities/FacilityIcon';
import { cutStringAtLength } from '@/utils/cut-string-at-length';
import { Line } from '@carrismetropolitana/api-types/network';

/* * */

interface Props {
	facilities: string[]
	id: string
	lines: Line[]
	location: string | undefined
	name: string
}

/* * */

export function OpenGraphStopsDynamic({ facilities, id, lines, location, name }: Props) {
	//

	//
	// A. Transform data

	let availableSlotsForLines = 4;
	let facilitiesIconSize = 120;

	switch (facilities.length) {
		case 0:
			availableSlotsForLines = 4;
			facilitiesIconSize = 120;
			break;
		case 1:
			availableSlotsForLines = 3;
			facilitiesIconSize = 120;
			break;
		case 2:
			availableSlotsForLines = 2;
			facilitiesIconSize = 120;
			break;
		case 3:
			availableSlotsForLines = 2;
			facilitiesIconSize = 105;
			break;
		case 4:
			availableSlotsForLines = 1;
			facilitiesIconSize = 120;
			break;
		case 5:
			availableSlotsForLines = 1;
			facilitiesIconSize = 100;
			break;
		default:
			availableSlotsForLines = 0;
			facilitiesIconSize = 100;
			break;
	}

	if (lines.length - availableSlotsForLines === 1) {
		availableSlotsForLines++;
	}

	const extraHiddenLinesAmount = lines.length - availableSlotsForLines;
	const extraHiddenLinesPhrase = `+ ${extraHiddenLinesAmount} ${extraHiddenLinesAmount !== 1 ? 'linhas' : 'linha'}`;

	//
	// B. Render components

	return (
		<div style={{ alignItems: 'flex-start', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: 50, width: '100%' }}>
			<div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<CMetropolitanaLogoLight height={130} />
				<div style={{ backgroundColor: '#f1f3f5', borderRadius: 999, color: '#868e96', display: 'flex', fontSize: 50, fontWeight: 700, lineHeight: 1, padding: '15px 40px 13px 40px' }}>
					#{id}
				</div>
			</div>

			<div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'flex-start', marginBottom: 40, marginLeft: 15, marginTop: 70 }}>
				<div style={{ borderRadius: 999, color: '#000', display: 'flex', fontSize: 55, fontWeight: 700, lineHeight: 1.1 }}>
					{cutStringAtLength(name, 50)}
				</div>
				<div style={{ borderRadius: 999, color: '#919191', display: 'flex', fontSize: 48, fontWeight: 600, lineHeight: 1.1 }}>
					{cutStringAtLength(location, 50)}
				</div>
			</div>

			<div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 50, justifyContent: 'flex-start', padding: 10 }}>
				{facilities.length > 0 && (
					<div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'row', gap: 25, justifyContent: 'flex-start' }}>
						{facilities.map(item => <FacilityIcon key={item} name={item} size={facilitiesIconSize} />)}
					</div>
				)}
				<div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 25, justifyContent: 'flex-start' }}>
					{lines.slice(0, availableSlotsForLines).map(item => (
						<div key={item.id} style={{ alignItems: 'center', backgroundColor: item.color, borderRadius: 999, color: item.text_color, display: 'flex', fontSize: 50, fontWeight: 700, height: 68, justifyContent: 'center', lineHeight: 1, paddingTop: 4, textAlign: 'center', width: 195 }}>
							{item.short_name}
						</div>
					))}
					{extraHiddenLinesAmount > 0 && (
						<div style={{ display: 'flex', fontSize: 38, fontWeight: 600, lineHeight: 1, paddingTop: 5 }}>
							{extraHiddenLinesPhrase}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
