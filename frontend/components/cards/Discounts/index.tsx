/* * */

import { DiscountTableDesktop } from '@/components/cards/DiscountTableDesktop';
import { DiscountTableMobile } from '@/components/cards/DiscountTableMobile';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Discount } from '@/types/discount.types';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export const availableDiscounts = ['normal', 'sub18', 'sub23', 'social-a', 'social-b', 'plus-65', 'combatente-plus-65', 'combatente-minus-65', 'family'];

/* * */

export function Discounts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Discounts');

	//
	// B. Transform data

	const formattedDiscounts: Discount[] = availableDiscounts.map(discount => ({
		description: t(`products.${discount}.description`),
		id: discount,
		price_metropolitano: t(`products.${discount}.price_metropolitano`),
		price_municipal: t(`products.${discount}.price_municipal`),
		title: t(`products.${discount}.title`),
	}));

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withPadding>
				<div className={styles.desktop}>
					<DiscountTableDesktop discounts={formattedDiscounts} />
				</div>
				<div className={styles.mobile}>
					<DiscountTableMobile discounts={formattedDiscounts} />
				</div>
			</Section>
		</Surface>
	);

	//
}
