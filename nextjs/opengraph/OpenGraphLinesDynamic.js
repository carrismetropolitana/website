/* * */

import CarrisMetropolitanaLogo from '@/components/CarrisMetropolitanaLogo/CarrisMetropolitanaLogo'
import FacilityIcon from '@/components/Facilities/FacilityIcon'
import cutStringAtLength from '@/services/cutStringAtLength'
import parseStopLocationName from '@/services/parseStopLocationName'

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
    <div style={{ alignItems: 'flex-start', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: 50, width: '100%' }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <CarrisMetropolitanaLogo height={130} />
      </div>

      <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: 15, justifyContent: 'flex-start', marginBottom: 40, marginLeft: 15, marginTop: 70 }}>
        <OpenGraphLineShortName color={lineData.color} shortName={lineData.short_name} textColor={lineData.text_color} />
        <OpenGraphLineLongName longName={lineData.long_name} />
        <OpenGraphLineLocalities localities={lineData.localities} />
      </div>

      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 50, justifyContent: 'flex-start', padding: 10 }}>
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

function OpenGraphLineShortName({ color, shortName, textColor }) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        color: textColor,
        display: 'flex',
        fontSize: 60,
        fontWeight: 700,
        lineHeight: 1,
        padding: '15px 40px 13px 40px',
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
        borderRadius: 999,
        color: '#000',
        display: 'flex',
        fontSize: 55,
        fontWeight: 700,
        lineHeight: 1.1,
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
        borderRadius: 999,
        color: '#919191',
        display: 'flex',
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1.3,
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
        alignItems: 'center',
        backgroundColor: '#ED1944',
        borderRadius: 999,
        color: '#fff',
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
