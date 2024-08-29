/* * */

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconZoomQuestionFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.SelectActivePatternGroupExplainer');

	const [modalIsOpen, { close: closeModal, open: openModal }] = useDisclosure(false);

	//
	// B. Render components

	return (
		<>
			<Modal onClose={closeModal} opened={modalIsOpen} title="Explicação">
				{/* * */}
			</Modal>
			<div className={styles.explainer} onClick={openModal}>
				<IconZoomQuestionFilled size={16} />
				{t('toggle')}
			</div>
		</>
	);

	//
}
