import { IconsSocial } from '@/settings/assets.settings';
import { Routes } from '@/utils/routes';
import { Flex, Image } from '@mantine/core';
import Link from 'next/link';

export default function Component() {
	return (
		<Flex gap={10}>
			<Link href={Routes.FACEBOOK} rel="noopener noreferrer" target="_blank">
				<Image alt="Facebook" height={24} src={IconsSocial.facebook} width={24} />
			</Link>
			<Link href={Routes.X} rel="noopener noreferrer" target="_blank">
				<Image alt="X" height={24} src={IconsSocial.x} width={24} />
			</Link>
			<Link href={Routes.INSTAGRAM} rel="noopener noreferrer" target="_blank">
				<Image alt="Instagram" height={24} src={IconsSocial.instagram} width={24} />
			</Link>
			<Link href={Routes.WHATSAPP} rel="noopener noreferrer" target="_blank">
				<Image alt="WhatsApp" height={24} src={IconsSocial.whatsapp} width={24} />
			</Link>
		</Flex>
	);
}
