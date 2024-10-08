/* * */

import LineBadgeBaseIcon from '@/components/common/LineBadgeBaseIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Pricing() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tickets.Pricing');

	//
	// B. Render components

	return (
		<>

			<Surface>
				<Section withPadding>
					<div className={styles.container}>
						<div className={styles.info}>
							<LineBadgeBaseIcon line_variant="close" />
							<h3>{t('proxima.title')}</h3>
							<p>{t('proxima.description')}</p>
						</div>
						<div className={styles.pricing}>
							<div className={styles.pricingItem}>
								<h3>1,25€</h3>
								<p>{t('ticket_types.onboard')}</p>
							</div>
							<div className={styles.pricingItem}>
								<h3>0,85€</h3>
								<p>{t('ticket_types.prepaid')}</p>
							</div>
						</div>
					</div>
				</Section>
			</Surface>

			<Surface>
				<Section withPadding>
					<div className={styles.container}>
						<div className={styles.info}>
							<LineBadgeBaseIcon line_variant="long" />
							<h3>{t('longa.title')}</h3>
							<p>{t('longa.description')}</p>
						</div>
						<div className={styles.pricing}>
							<div className={styles.pricingItem}>
								<h3>2,60€</h3>
								<p>{t('ticket_types.onboard')}</p>
							</div>
							<div className={styles.pricingItem}>
								<h3>1,55€</h3>
								<p>{t('ticket_types.prepaid')}</p>
							</div>
						</div>
					</div>
				</Section>
			</Surface>

			<Surface>
				<Section withPadding>
					<div className={styles.container}>
						<div className={styles.info}>
							<LineBadgeBaseIcon line_variant="fast" />
							<h3>{t('longa.title')}</h3>
							<p>{t('longa.description')}</p>
						</div>
						<div className={styles.pricing}>
							<div className={styles.pricingItem}>
								<h3>4,50€</h3>
								<p>{t('ticket_types.onboard')}</p>
							</div>
							<div className={styles.pricingItem}>
								<h3>3,10€</h3>
								<p>{t('ticket_types.prepaid')}</p>
							</div>
						</div>
					</div>
				</Section>
			</Surface>

			<Surface>
				<Section withPadding>
					<div className={styles.container}>
						<div className={styles.info}>
							<LineBadgeBaseIcon line_variant="inter-regional" />
							<h3>{t('inter-regional.title')}</h3>
							<p>{t('inter-regional.description')}</p>
						</div>
						<div className={styles.pricing}>
							<div className={styles.pricingItem}>
								<div>
									<h3>3,10€</h3>
									<p>{t('ticket_types.onboard_start_by_29')}</p>
								</div>
								<div style={{ marginTop: 30 }}>
									<h3>3,60€</h3>
									<p>{t('ticket_types.onboard_start_by_49')}</p>
								</div>
							</div>
							<div className={styles.pricingItem}>
								<h3>1,55€</h3>
								<p>{t('ticket_types.prepaid')}</p>
							</div>
						</div>
					</div>
				</Section>
			</Surface>

			<Surface>
				<Section withPadding>
					<div className={styles.container}>
						<div className={styles.info}>
							<LineBadgeBaseIcon line_variant="sea" />
							<h3>{t('mar.title')}</h3>
							<p>{t('mar.description')}</p>
						</div>
						<div className={styles.pricing}>
							<div className={styles.pricingItem}>
								<h3>4,50€</h3>
								<p>{t('ticket_types.onboard')}</p>
							</div>
							<div className={styles.pricingItem}>
								<h3>3,10€</h3>
								<p>{t('ticket_types.prepaid')}</p>
							</div>
						</div>
					</div>
				</Section>
			</Surface>
		</>
	);

	//
}
