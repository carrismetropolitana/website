'use client';

import Button from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { BrandsCmet } from '@/settings/assets.settings';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Section } from '../../layout/Section';
import { Surface } from '../../layout/Surface';
import styles from './styles.module.css';
export default function Component() {
	const t = useTranslations('press.Page.knowledge_base');
	const tCommon = useTranslations('common');

	return (
		<Surface>
			<Section heading={t('heading')} right={<Button label={tCommon('button.view_all')} variant="primary" />} withPadding>
				<Grid columns="abcd" withGap>
					<Card className={styles.card}>
						<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
					</Card>
					<Card className={styles.card}>
						<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
					</Card>
					<Card className={styles.card}>
						<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
					</Card>
					<Card className={styles.card}>
						<Image alt="Logo" className={styles.image} height={100} src={BrandsCmet.cmet_light} width={100} />
					</Card>
				</Grid>
			</Section>
		</Surface>
	);
}
