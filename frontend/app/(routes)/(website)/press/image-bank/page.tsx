import { Grid } from '@/components/layout/Grid';
import Image from 'next/image';

export default async function Page() {
	const imagesUrls = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/image-bank`, { cache: 'no-cache' }).then(res => res.json());

	if (!imagesUrls) return null;

	return (
		<Grid columns="abcd" withGap>
			{imagesUrls.map((imageUrl: string, index: number) => (
				<Image key={index} alt="Image" height={250} src={`/images/press/image-bank/${imageUrl}`} style={{ objectFit: 'cover' }} width={250} />
			))}
		</Grid>
	);
}
