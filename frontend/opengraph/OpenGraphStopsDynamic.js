/* * */

import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo';
import parseStopLocationName from '@/services/parseStopLocationName';
import cutStringAtLength from '@/services/cutStringAtLength';
import FacilityIcon from '@/components/Facilities/FacilityIcon';

/* * */

export default function OpenGraphStopsDynamic({ stopData, allLinesData }) {
  //

  //
  // A. Settings

  let availableSlotsForLines = 4;
  let facilitiesIconSize = 120;

  switch (stopData.facilities.length) {
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

  if (allLinesData.length - availableSlotsForLines === 1) availableSlotsForLines++;

  const extraHiddenLinesAmount = allLinesData.length - availableSlotsForLines;

  //
  // D. Render components

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', padding: 50, backgroundColor: '#fff', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CarrisMetropolitanaLogo height={130} />
        <OpenGraphStopId id={stopData.id} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15, marginLeft: 15, marginTop: 70, marginBottom: 40 }}>
        <OpenGraphStopName name={stopData.name} />
        <OpenGraphStopLocation locality={stopData.locality} municipalityName={stopData.municipality_name} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 50, padding: 10 }}>
        {stopData.facilities.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 25 }}>
            {stopData.facilities.map((item) => (
              <FacilityIcon key={item} name={item} size={facilitiesIconSize} />
            ))}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 25 }}>
          {allLinesData.slice(0, availableSlotsForLines).map((item) => (
            <OpenGraphLineBadge key={item.id} shortName={item.short_name} />
          ))}
          {extraHiddenLinesAmount > 0 && <OpenGraphExtraHiddenLines amount={extraHiddenLinesAmount} />}
        </div>
      </div>
    </div>
  );
}

function OpenGraphStopId({ id }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#f1f3f5',
        fontSize: 50,
        fontWeight: 700,
        color: '#868e96',
        lineHeight: 1,
        padding: '15px 40px 13px 40px',
        borderRadius: 999,
      }}
    >
      #{id}
    </div>
  );
}

function OpenGraphStopName({ name }) {
  const stopNameFormatted = cutStringAtLength(name, 50);
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 55,
        fontWeight: 700,
        lineHeight: 1.1,
        color: '#000',
        borderRadius: 999,
      }}
    >
      {stopNameFormatted}
    </div>
  );
}

function OpenGraphStopLocation({ locality, municipalityName }) {
  const stopLocationFormatted = cutStringAtLength(parseStopLocationName(locality, municipalityName), 50);
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 48,
        fontWeight: 600,
        lineHeight: 1.1,
        color: '#919191',
        borderRadius: 999,
      }}
    >
      {stopLocationFormatted}
    </div>
  );
}

function OpenGraphLineBadge({ shortName }) {
  return (
    <div
      style={{
        display: 'flex',
        width: 195,
        height: 68,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: '#ED1944',
        fontSize: 50,
        fontWeight: 700,
        paddingTop: 4,
        lineHeight: 1,
        color: '#fff',
      }}
    >
      {shortName}
    </div>
  );
}

function OpenGraphExtraHiddenLines({ amount }) {
  const singularOrPlural = amount !== 1 ? 'linhas' : 'linha';
  const phrase = `+ ${amount} ${singularOrPlural}`;
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1,
        paddingTop: 5,
      }}
    >
      {phrase}
    </div>
  );
}
