/* * */

import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo';
import parseStopLocationName from '@/services/parseStopLocationName';
import cutStringAtLength from '@/services/cutStringAtLength';
import FacilityIcon from '@/components/Facilities/FacilityIcon';

/* * */

export default function OpenGraphLinesDynamic({ lineData }) {
  //

  //
  // A. Settings

  //   let availableSlotsForLines = 4;
  //   let facilitiesIconSize = 120;

  //   switch (lineData.facilities.length) {
  //     case 0:
  //       availableSlotsForLines = 4;
  //       facilitiesIconSize = 120;
  //       break;
  //     case 1:
  //       availableSlotsForLines = 3;
  //       facilitiesIconSize = 120;
  //       break;
  //     case 2:
  //       availableSlotsForLines = 2;
  //       facilitiesIconSize = 120;
  //       break;
  //     case 3:
  //       availableSlotsForLines = 2;
  //       facilitiesIconSize = 105;
  //       break;
  //     case 4:
  //       availableSlotsForLines = 1;
  //       facilitiesIconSize = 120;
  //       break;
  //     case 5:
  //       availableSlotsForLines = 1;
  //       facilitiesIconSize = 100;
  //       break;
  //     default:
  //       availableSlotsForLines = 0;
  //       facilitiesIconSize = 100;
  //       break;
  //   }

  //   if (allLinesData.length - availableSlotsForLines === 1) availableSlotsForLines++;

  //   const extraHiddenLinesAmount = allLinesData.length - availableSlotsForLines;

  //
  // D. Render components

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', padding: 50, backgroundColor: '#fff', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CarrisMetropolitanaLogo height={130} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15, marginLeft: 15, marginTop: 70, marginBottom: 40 }}>
        <OpenGraphLineShortName shortName={lineData.short_name} color={lineData.color} textColor={lineData.text_color} />
        <OpenGraphLineLongName longName={lineData.long_name} />
        <OpenGraphLineLocalities localities={lineData.localities} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 50, padding: 10 }}>
        {/* {lineData.facilities.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 25 }}>
            {lineData.facilities.map((item) => (
              <FacilityIcon key={item} name={item} size={facilitiesIconSize} />
            ))}
          </div>
        )} */}
        {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 25 }}>
          {allLinesData.slice(0, availableSlotsForLines).map((item) => (
            <OpenGraphLineBadge key={item.id} shortName={item.short_name} />
          ))}
          {extraHiddenLinesAmount > 0 && <OpenGraphExtraHiddenLines amount={extraHiddenLinesAmount} />}
        </div> */}
      </div>
    </div>
  );
}

function OpenGraphLineShortName({ shortName, color, textColor }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: color,
        fontSize: 60,
        fontWeight: 700,
        color: textColor,
        lineHeight: 1,
        padding: '15px 40px 13px 40px',
        borderRadius: 999,
      }}
    >
      {shortName}
    </div>
  );
}

function OpenGraphLineLongName({ longName }) {
  const lineNameFormatted = cutStringAtLength(longName, 60);
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
      {lineNameFormatted}
    </div>
  );
}

function OpenGraphLineLocalities({ localities }) {
  const lineLocalitiesFormatted = cutStringAtLength(localities.join(' • '), 150);
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1.3,
        color: '#919191',
        borderRadius: 999,
      }}
    >
      {lineLocalitiesFormatted}
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
