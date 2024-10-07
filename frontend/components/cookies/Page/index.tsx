'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Button, Group, Table } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('CookiesPage');
	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleEnable = () => {
		analyticsContext.actions.enable();
		analyticsContext.actions.capture('test');
	};

	const handleDisable = () => {
		openConfirmModal({
			centered: true,
			children: <p>{t('sections.question_6.refuse_modal.description')}</p>,
			closeOnClickOutside: true,
			confirmProps: { color: 'red' },
			labels: { cancel: t('sections.question_6.refuse_modal.cancel'), confirm: t('sections.question_6.refuse_modal.confirm') },
			onConfirm: () => {
				analyticsContext.actions.reset();
			},
			title: t('sections.question_6.refuse_modal.title'),
		});
	};

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('sections.intro.title')} withPadding>
				<div className={styles.text}>{t('sections.intro.paragraphs.1')}</div>
			</Section>
			<Section heading={t('title')} withPadding>
				<div className={styles.container}>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_1.title')}</div>
						<div className={styles.text}>{t('sections.question_1.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_1.paragraphs.2')}</div>
						<div className={styles.text}>{t('sections.question_1.paragraphs.3')}</div>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_2.title')}</div>
						<div className={styles.text}>{t('sections.question_2.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_2.paragraphs.2')}</div>
						<div className={styles.text}>{t('sections.question_2.paragraphs.3')}</div>
						<div className={styles.text}>{t('sections.question_2.paragraphs.4')}</div>
						<div className={styles.text}>{t('sections.question_2.paragraphs.5')}</div>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_3.title')}</div>
						<div className={styles.text}>{t('sections.question_3.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_3.paragraphs.2')}</div>
						<div className={styles.text}>{t('sections.question_3.paragraphs.3')}</div>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_4.title')}</div>
						<div className={styles.text}>{t('sections.question_4.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_4.paragraphs.2')}</div>
						<div className={styles.text}>{t('sections.question_4.paragraphs.3')}</div>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_5.title')}</div>
						<Table withColumnBorders withTableBorder>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>{t('sections.question_5.table.header.col_1')}</Table.Th>
									<Table.Th>{t('sections.question_5.table.header.col_2')}</Table.Th>
									<Table.Th>{t('sections.question_5.table.header.col_3')}</Table.Th>
									<Table.Th>{t('sections.question_5.table.header.col_4')}</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								<Table.Tr>
									<Table.Td>{t('sections.question_5.table.rows.1.col_1')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.1.col_2')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.1.col_3')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.1.col_4')}</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Td>{t('sections.question_5.table.rows.2.col_1')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.2.col_2')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.2.col_3')}</Table.Td>
									<Table.Td>{t('sections.question_5.table.rows.2.col_4')}</Table.Td>
								</Table.Tr>
							</Table.Tbody>
						</Table>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_6.title')}</div>
						<div className={styles.text}>{t('sections.question_6.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_6.paragraphs.2')}</div>
						<div className={styles.authorizationOptions}>
							{!analyticsContext.flags.is_enabled
							&& (
								<Button color="green" onClick={handleEnable} variant="light">
									{t('sections.question_6.accept')}
								</Button>
							)}
							{analyticsContext.flags.is_enabled
							&& (
								<Button color="green" leftSection={<IconCircleCheckFilled size={16} />} onClick={() => null} variant="outline">
									{t('sections.question_6.enabled')}
								</Button>
							)}
							{analyticsContext.flags.is_enabled
							&& (
								<Button color="red" onClick={handleDisable} variant="light">
									{t('sections.question_6.refuse')}
								</Button>
							)}
						</div>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_7.title')}</div>
						<div className={styles.text}>{t('sections.question_7.paragraphs.1')}</div>
						<div className={styles.text}>{t('sections.question_7.paragraphs.2')}</div>
						<Group>
							<a href="https://support.google.com/chrome/answer/95647?hl=pt" target="_blank">
								Google Chrome
							</a>
							<a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank">
								Safari
							</a>
							<a href="https://support.mozilla.org/pt-PT/kb/cookies-informacao-que-websites-guardam-no-seu-computador" target="_blank">
								Mozilla Firefox
							</a>
							<a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">
								Microsoft Edge
							</a>
							<a href="https://support.microsoft.com/pt-pt/windows/eliminar-e-gerir-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank">
								Internet Explorer
							</a>
						</Group>
					</div>
					<div className={styles.section}>
						<div className={styles.title}>{t('sections.question_8.title')}</div>
						<div className={styles.text}>{t('sections.question_8.paragraphs.1')}</div>
					</div>
				</div>
			</Section>
		</Surface>
	);

	//
}
