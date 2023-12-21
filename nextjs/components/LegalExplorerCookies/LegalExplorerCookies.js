'use client';

import styles from './LegalExplorerCookies.module.css';
import Panel from '@/components/Panel/Panel';
import { Anchor, Button, Group, Table } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { useAnalyticsContext } from '@/contexts/FrontendAnalyticsContext';
import { IconCircleCheckFilled } from '@tabler/icons-react';

export default function LegalExplorerCookies() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LegalExplorerCookies');
  const analyticsContext = useAnalyticsContext();

  //
  // B. Handle actions

  const handleEnable = () => {
    analyticsContext.enable();
    analyticsContext.capture('test');
  };

  const handleDisable = () => {
    openConfirmModal({
      title: t('sections.question_6.refuse_modal.title'),
      centered: true,
      closeOnClickOutside: true,
      children: <p>{t('sections.question_6.refuse_modal.description')}</p>,
      labels: { confirm: t('sections.question_6.refuse_modal.confirm'), cancel: t('sections.question_6.refuse_modal.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        analyticsContext.disable();
      },
    });
  };

  //
  // B. Render components

  return (
    <Panel type="B" title={t('title')}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title}>{t('sections.intro.title')}</div>
          <div className={styles.text}>{t('sections.intro.paragraphs.1')}</div>
        </div>
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
          <Table withTableBorder withColumnBorders>
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
            {!analyticsContext.enabled && (
              <Button onClick={handleEnable} variant="light" color="green">
                {t('sections.question_6.accept')}
              </Button>
            )}
            {analyticsContext.enabled && (
              <Button onClick={() => {}} leftSection={<IconCircleCheckFilled size={16} />} variant="outline" color="green">
                {t('sections.question_6.enabled')}
              </Button>
            )}
            {analyticsContext.enabled && (
              <Button onClick={handleDisable} variant="light" color="red">
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
            <Anchor href="https://support.google.com/chrome/answer/95647?hl=pt" target="_blank">
              Google Chrome
            </Anchor>
            <Anchor href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank">
              Safari
            </Anchor>
            <Anchor href="https://support.mozilla.org/pt-PT/kb/cookies-informacao-que-websites-guardam-no-seu-computador" target="_blank">
              Mozilla Firefox
            </Anchor>
            <Anchor href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">
              Microsoft Edge
            </Anchor>
            <Anchor href="https://support.microsoft.com/pt-pt/windows/eliminar-e-gerir-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank">
              Internet Explorer
            </Anchor>
          </Group>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>{t('sections.question_8.title')}</div>
          <div className={styles.text}>{t('sections.question_8.paragraphs.1')}</div>
        </div>
      </div>
    </Panel>
  );

  //
}
