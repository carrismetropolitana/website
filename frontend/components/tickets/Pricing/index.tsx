import LineBadgeBaseIcon from '@/components/common/LineBadgeBaseIcon';
import { Section } from '@/components/layout/Section';

import styles from './styles.module.css';

export default function Component() {
	return (
		<>
			{/* Close Lines */}
			<Section childrenWrapperStyles={styles.container} withChildrenPadding>
				<div className={styles.info}>
					<LineBadgeBaseIcon line_variant="close" />
					<h3>Linhas Próximas</h3>
					<p>Linhas dedicadas a bairros, zonas de pormenor. São linhas normalmente com percursos mais curtos, circulares e com mais paragens.</p>
				</div>
				<div className={styles.pricing}>
					<div className={styles.pricingItem}>
						<h3>1,25€</h3>
						<p>bilhete de bordo</p>
					</div>
					<div className={styles.pricingItem}>
						<h3>0,85€</h3>
						<p>pré-pago</p>
					</div>
				</div>
			</Section>
			{/* Long Lines */}
			<Section childrenWrapperStyles={styles.container} withChildrenPadding>
				<div className={styles.info}>
					<LineBadgeBaseIcon line_variant="long" />
					<h3>Linhas Longas</h3>
					<p>Linhas dedicadas a bairros, zonas de pormenor. São linhas normalmente com percursos mais curtos, circulares e com mais paragens.</p>
				</div>
				<div className={styles.pricing}>
					<div className={styles.pricingItem}>
						<h3>2,60€</h3>
						<p>bilhete de bordo</p>
					</div>
					<div className={styles.pricingItem}>
						<h3>1,55€</h3>
						<p>pré-pago</p>
					</div>
				</div>
			</Section>
			{/* Fast Lines */}
			<Section childrenWrapperStyles={styles.container} withChildrenPadding>
				<div className={styles.info}>
					<LineBadgeBaseIcon line_variant="fast" />
					<h3>Linhas Rápidas</h3>
					<p>Linhas dedicadas a bairros, zonas de pormenor. São linhas normalmente com percursos mais curtos, circulares e com mais paragens.</p>
				</div>
				<div className={styles.pricing}>
					<div className={styles.pricingItem}>
						<h3>4,50€</h3>
						<p>bilhete de bordo</p>
					</div>
					<div className={styles.pricingItem}>
						<h3>3,10€</h3>
						<p>pré-pago</p>
					</div>
				</div>
			</Section>
			{/* Inter-Regional Lines */}
			<Section childrenWrapperStyles={styles.container} withChildrenPadding>
				<div className={styles.info}>
					<LineBadgeBaseIcon line_variant="inter-regional" />
					<h3>Linhas Próximas</h3>
					<p>Linhas dedicadas a bairros, zonas de pormenor. São linhas normalmente com percursos mais curtos, circulares e com mais paragens.</p>
				</div>
				<div className={styles.pricing}>
					<div className={styles.pricingItem}>
						<div>
							<h3>3,10€</h3>
							<p>bilhete de bordo linhas começadas por 29**</p>
						</div>
						<div style={{ marginTop: 30 }}>
							<h3>3,60€</h3>
							<p>bilhete de bordo linhas começadas por 49**</p>
						</div>
					</div>
					<div className={styles.pricingItem}>
						<h3>1,55€</h3>
						<p>pré-pago</p>
					</div>
				</div>
			</Section>
			{/* Sea Lines */}
			<Section childrenWrapperStyles={styles.container} withChildrenPadding>
				<div className={styles.info}>
					<LineBadgeBaseIcon line_variant="sea" />
					<h3>Linhas Próximas</h3>
					<p>Linhas dedicadas a bairros, zonas de pormenor. São linhas normalmente com percursos mais curtos, circulares e com mais paragens.</p>
				</div>
				<div className={styles.pricing}>
					<div className={styles.pricingItem}>
						<h3>4,50€</h3>
						<p>bilhete de bordo</p>
					</div>
					<div className={styles.pricingItem}>
						<h3>3,10€</h3>
						<p>pré-pago</p>
					</div>
				</div>
			</Section>
		</>
	);
}
