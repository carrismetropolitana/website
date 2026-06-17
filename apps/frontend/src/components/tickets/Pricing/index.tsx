'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
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

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LottiePlayer path="/assets/tickets/animations/proxima.json" style={{ maxWidth: 65 }} play />
						<h3 className={styles.title}>{t('proxima.title')}</h3>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>1,30€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>0,85€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LottiePlayer path="/assets/tickets/animations/longa.json" style={{ maxWidth: 65 }} play />
						<h3 className={styles.title}>{t('longa.title')}</h3>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>2,70€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>1,55€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LottiePlayer path="/assets/tickets/animations/rapida.json" style={{ maxWidth: 65 }} play />
						<h3 className={styles.title}>{t('rapida.title')}</h3>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>4,65€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,10€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LottiePlayer path="/assets/tickets/animations/inter-regional.json" style={{ maxWidth: 65 }} play />
						<h3 className={styles.title}>{t('inter-regional.title')}</h3>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,20€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
							<p className={styles.priceLabel}>{t('ticket_types.onboard_start_by_29')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,70€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
							<p className={styles.priceLabel}>{t('ticket_types.onboard_start_by_49')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>-</h3>
						</div>
					</div>
				</div>
			</Surface>

			<Surface variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<LottiePlayer path="/assets/tickets/animations/mar.json" style={{ maxWidth: 65 }} play />
						<h3 className={styles.title}>{t('mar.title')}</h3>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>4,65€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.onboard')}</p>
						</div>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>3,10€</h3>
							<p className={styles.priceLabel}>{t('ticket_types.prepaid')}</p>
						</div>
					</div>
				</div>
			</Surface>

		</>
	);

	//
}
