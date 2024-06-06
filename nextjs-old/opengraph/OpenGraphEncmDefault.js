/* * */

import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo';

/* * */

export default function OpenGraphDefault() {
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', width: '100%' }}>
			<div style={{ alignItems: 'flex-start', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 60 }}>
				<CarrisMetropolitanaLogo height={180} />
				<div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'flex-start', marginLeft: 10, marginTop: 80 }}>
					<div style={{ borderRadius: 999, color: '#000', display: 'flex', fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>Espaços navegante® Carris Metropolitana</div>
					<div style={{ borderRadius: 999, color: '#919191', display: 'flex', fontSize: 50, fontWeight: 600, lineHeight: 1.1 }}>Ocupação e em Tempo Real</div>
				</div>
			</div>
			<div style={{ backgroundColor: '#FFDD00', display: 'flex', height: 20, width: '100%' }} />
		</div>
	);
}
