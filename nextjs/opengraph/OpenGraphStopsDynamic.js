/* * */

import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo'
import FacilityIcon from '@/components/Facilities/FacilityIcon'
import cutStringAtLength from '@/services/cutStringAtLength'
import parseStopLocationName from '@/services/parseStopLocationName'

/* * */

export default function OpenGraphStopsDynamic({ allLinesData, stopData }) {
  //

  //
  // A. Settings

  let availableSlotsForLines = 4;
  let facilitiesIconSize = 120;

  switch (stopData.facilities.length) {
    case 0:
      availableSlotsForLines = 4;
      facilitiesIconSize = 120;
      break
    case 1:
      availableSlotsForLines = 3;
      facilitiesIconSize = 120;
      break
    case 2:
      availableSlotsForLines = 2;
      facilitiesIconSize = 120;
      break
    case 3:
      availableSlotsForLines = 2;
      facilitiesIconSize = 105;
      break
    case 4:
      availableSlotsForLines = 1;
      facilitiesIconSize = 120;
      break
    case 5:
      availableSlotsForLines = 1;
      facilitiesIconSize = 100;
      break
    default:
      availableSlotsForLines = 0;
      facilitiesIconSize = 100;
      break
  }

  if (allLinesData.length - availableSlotsForLines === 1) availableSlotsForLines++;

  const extraHiddenLinesAmount = allLinesData.length - availableSlotsForLines;

  //
  // D. Render components

  return (
    <div style={{ alignItems: 'flex-start', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: 50, width: '100%' }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <CarrisMetropolitanaLogo height={130} />
        <OpenGraphStopId id={stopData.id} />
      </div>

      <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'flex-start', marginBottom: 40, marginLeft: 15, marginTop: 70 }}>
        <OpenGraphStopName name={stopData.name} />
        <OpenGraphStopLocation locality={stopData.locality} municipalityName={stopData.municipality_name} />
      </div>

      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 50, justifyContent: 'flex-start', padding: 10 }}>
        {stopData.facilities.length > 0 &&
        (
          <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'row', gap: 25, justifyContent: 'flex-start' }}>
            {stopData.facilities.map((item) =>
              <FacilityIcon key={item} name={item} size={facilitiesIconSize} />)}
          </div>
        )}
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 25, justifyContent: 'flex-start' }}>
          {allLinesData.slice(0, availableSlotsForLines).map((item) =>
            <OpenGraphLineBadge color={item.color} key={item.id} shortName={item.short_name} textColor={item.text_color} />)}
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
        backgroundColor: '#f1f3f5',
        borderRadius: 999,
        color: '#868e96',
        display: 'flex',
        fontSize: 50,
        fontWeight: 700,
        lineHeight: 1,
        padding: '15px 40px 13px 40px',
      }}
    >
      #
      {id}
    </div>
  );
}

function OpenGraphStopName({ name }) {
  const stopNameFormatted = cutStringAtLength(name, 50);
  return (
    <div
      style={{
        borderRadius: 999,
        color: '#000',
        display: 'flex',
        fontSize: 55,
        fontWeight: 700,
        lineHeight: 1.1,
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
        borderRadius: 999,
        color: '#919191',
        display: 'flex',
        fontSize: 48,
        fontWeight: 600,
        lineHeight: 1.1,
      }}
    >
      {stopLocationFormatted}
    </div>
  );
}

function OpenGraphLineBadge({ color, shortName, textColor }) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: 999,
        color: textColor,
        display: 'flex',
        fontSize: 50,
        fontWeight: 700,
        height: 68,
        justifyContent: 'center',
        lineHeight: 1,
        paddingTop: 4,
        textAlign: 'center',
        width: 195,
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
