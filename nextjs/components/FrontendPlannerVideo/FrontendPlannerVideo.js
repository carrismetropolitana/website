'use client';

/* * */

import { ActionIcon, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './FrontendPlannerVideo.module.css';

/* * */

export default function FrontendPlannerVideo() {
	//

	//
	// A. Setup variables

	const [opened, { close, open }] = useDisclosure(false);
	const t = useTranslations('FrontendPlanner');

	console.log(styles);
	//
	// B. Render components

	return (
		<>
			<Modal.Root onClose={close} opened={opened} size="calc(100vw - 3rem)" centered>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header classNames={{ header: styles.modalHeader }}>
						<h3>{t('how_to_use')}</h3>
						<ActionIcon aria-label="close" color="white" onClick={close} size="md" variant="subtle">
							<IconX />
						</ActionIcon>
					</Modal.Header>
					<Modal.Body className={styles.modalBody} p={0}>
						<iframe allow="autoplay; encrypted-media; picture-in-picture; web-share" className={styles.iframe} frameborder="0" src="https://www.youtube-nocookie.com/embed/cckWfHTyDwQ" allowfullscreen />
					</Modal.Body>
				</Modal.Content>
			</Modal.Root>

			<Button
				onClick={open}
				variant="default"
				leftSection={(
					<svg height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
						<path d="M3 22v-20l18 10-18 10z" />
					</svg>
				)}
			>
				{t('open')}
			</Button>
		</>
	);

	//
}
