/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphStopsDefault from 'opengraph/OpenGraphStopsDefault';
import OpenGraphStopsDynamic from 'opengraph/OpenGraphStopsDynamic';

/* * */

export const alt = 'Alertas de Serviço';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
  //

  //
  // A. Setup fonts

  const customFonts = [
    { data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
    { data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
    { data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
  ]

  //
  // B. Fetch data

  const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then(res => res.json());

  //
  // C. Render default component

  if (params.stop_id === 'all' || !stopData?.id) {
    return new ImageResponse(<OpenGraphStopsDefault />, { ...size, fonts: customFonts });
  }

  //
  // D. Fetch additional data

  const allLinesData = await Promise.all(stopData.lines.map(lineId => fetch(`https://api.carrismetropolitana.pt/lines/${lineId}`).then(res => res.json())));

  //
  // E. Render dynamic component

  return new ImageResponse(<OpenGraphStopsDynamic allLinesData={allLinesData} stopData={stopData} />, { ...size, fonts: customFonts });

  //
}
