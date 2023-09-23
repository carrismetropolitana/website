import { ImageResponse } from 'next/server';

export const alt = 'About Acme';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }) {
  //   const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
  //     res.json()
  //   )

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        dijfhsudihf
      </div>
    ),
    {
      ...size,
    }
  );
}
