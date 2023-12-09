/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphStopsDefault from 'opengraph/OpenGraphStopsDefault';
import OpenGraphStopsDynamic from 'opengraph/OpenGraphStopsDynamic';

/* * */

export const alt = 'Mais sobre este veículo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
  //

  //
  // A. Setup fonts

  const customFonts = [
    { name: 'Inter', style: 'normal', weight: 500, data: fs.readFileSync(`${process.cwd()}/assets/fonts/Inter-Medium.ttf`).buffer },
    { name: 'Inter', style: 'normal', weight: 600, data: fs.readFileSync(`${process.cwd()}/assets/fonts/Inter-SemiBold.ttf`).buffer },
    { name: 'Inter', style: 'normal', weight: 700, data: fs.readFileSync(`${process.cwd()}/assets/fonts/Inter-Bold.ttf`).buffer },
  ];

  //
  // B. Fetch data

  const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then((res) => res.json());

  //
  // C. Render default component

  if (params.stop_id === 'all' || !stopData?.id) {
    return new ImageResponse(<OpenGraphStopsDefault />, { ...size, fonts: customFonts });
  }

  // - - -

  //
  // D. Fetch additional data

  const allLinesData = [];

  for (const lineId of stopData.lines) {
    const lineData = await fetch(`https://api.carrismetropolitana.pt/lines/${lineId}`).then((res) => res.json());
    allLinesData.push(lineData);
  }

  //
  // E. Render dynamic component

  return new ImageResponse(<OpenGraphStopsDynamic stopData={stopData} allLinesData={allLinesData} />, { ...size, fonts: customFonts });

  //
}
