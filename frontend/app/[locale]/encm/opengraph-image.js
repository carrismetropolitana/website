/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphEncmDefault from 'opengraph/OpenGraphEncmDefault';

/* * */

export const alt = 'Website Beta Carris Metropolitana';
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
  // B. Render components

  return new ImageResponse(<OpenGraphEncmDefault />, { ...size, fonts: customFonts });

  //
}
