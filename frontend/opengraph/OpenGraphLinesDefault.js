import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo';

export default function OpenGraphLinesDefault() {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', padding: 60, backgroundColor: '#fff', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <CarrisMetropolitanaLogo height={180} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 20, marginLeft: 10, marginTop: 80 }}>
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, lineHeight: 1.1, color: '#000', borderRadius: 999 }}>Todas as Paragens e Horários em Tempo Real</div>
          <div style={{ display: 'flex', fontSize: 50, fontWeight: 600, lineHeight: 1.1, color: '#919191', borderRadius: 999 }}>All Stops and Schedules in Real Time</div>
        </div>
      </div>
      <div style={{ height: 20, width: '100%', display: 'flex', backgroundColor: '#FFDD00' }} />
    </div>
  );
}
