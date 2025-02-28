'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
import { Accordion, Image, List, Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AboutPage() {
	//

	//

	//
	// A. Setup variables

	const t = useTranslations('about.AboutPage');

	//
	// B. Render components

	return (
		<>

			<Surface forceOverflow>
				<Image alt="Carris Metropolitana" src="/images/about/about-header.svg" />
			</Surface>

			<Surface forceOverflow>
				<Accordion>

					<Accordion.Item value="section-1">
						<Accordion.Control>{t('sections.section-1.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-1.text-1')}</p>
							<p className={styles.text}>{t('sections.section-1.text-2')}</p>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-2">
						<Accordion.Control>{t('sections.section-2.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-2.text-1')}</p>
							<p className={styles.text}>{t('sections.section-2.text-2')}</p>
							<p className={styles.text}>{t('sections.section-2.text-3')}</p>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-3">
						<Accordion.Control>{t('sections.section-3.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-3.text-1')}</p>
							<p className={styles.text}>{t('sections.section-3.text-2')}</p>
							<p className={styles.text}>{t('sections.section-3.text-3')}</p>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-4">
						<Accordion.Control>{t('sections.section-4.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-4.text-1')}</p>
							<p className={styles.text}>{t('sections.section-4.text-2')}</p>
							<p className={styles.text}>{t('sections.section-4.text-3')}</p>
							<p className={styles.text}>{t('sections.section-4.text-4')}</p>
							<ThemeSwitch
								dark={<Image alt="Estrutura da Carris Metropolitana" src="/images/about/about-estrutura-dark.svg" />}
								light={<Image alt="Estrutura da Carris Metropolitana" src="/images/about/about-estrutura-light.svg" />}
							/>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-5">
						<Accordion.Control>{t('sections.section-5.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-5.text-1')}</p>
							<Table
								my={20}
								data={{
									body: [
										[t('sections.section-5.table.rows.tr-1.tc-1'), t('sections.section-5.table.rows.tr-1.tc-2'), t('sections.section-5.table.rows.tr-1.tc-3')],
										[t('sections.section-5.table.rows.tr-2.tc-1'), t('sections.section-5.table.rows.tr-2.tc-2'), t('sections.section-5.table.rows.tr-2.tc-3')],
										[t('sections.section-5.table.rows.tr-3.tc-1'), t('sections.section-5.table.rows.tr-3.tc-2'), t('sections.section-5.table.rows.tr-3.tc-3')],
										[t('sections.section-5.table.rows.tr-4.tc-1'), t('sections.section-5.table.rows.tr-4.tc-2'), t('sections.section-5.table.rows.tr-4.tc-3')],
									],
									caption: t('sections.section-5.table.caption'),
									head: [t('sections.section-5.table.head.th-1'), t('sections.section-5.table.head.th-2'), t('sections.section-5.table.head.th-3')],
								}}
							/>
							<p className={styles.text}>{t('sections.section-5.text-2')}</p>
							<p className={styles.text}>{t('sections.section-5.text-3')}</p>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-6">
						<Accordion.Control>{t('sections.section-6.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-6.text-1')}</p>
							<p className={styles.text}>{t('sections.section-6.text-2')}</p>
							<p className={styles.text}>{t('sections.section-6.text-3')}</p>
							<p className={styles.text}>{t('sections.section-6.text-4')}</p>
							<List mt={10} size="lg" withPadding>
								<List.Item>{t('sections.section-6.list.item-1')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-2')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-3')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-4')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-5')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-6')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-7')}</List.Item>
								<List.Item>{t('sections.section-6.list.item-8')}</List.Item>
							</List>
							<p className={styles.text}>{t('sections.section-6.text-5')}</p>
						</Accordion.Panel>
					</Accordion.Item>

					<Accordion.Item value="section-7">
						<Accordion.Control>{t('sections.section-7.title')}</Accordion.Control>
						<Accordion.Panel>
							<p className={styles.text}>{t('sections.section-7.text-1')}</p>
							<p className={styles.text}>{t('sections.section-7.text-2')}</p>
							<p className={styles.text}>{t('sections.section-7.text-3')}</p>
						</Accordion.Panel>
					</Accordion.Item>

				</Accordion>
			</Surface>

		</>
	);
}
