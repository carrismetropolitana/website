'use client';

/* * */

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './FrontendFooterLegal.module.css';

/* * */

export default function FrontendFooterLegal() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendFooterLegal');

	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.copyright}>{t('copyright', { year: (new Date()).getFullYear() })}</div>
			<div className={styles.legalMenu}>
				<a href="https://www.livroreclamacoes.pt" target="_blank">
					<Image alt={t('complaints_book')} height={50} src="/images/livro-de-reclamacoes.svg" width={125} priority />
				</a>
				<a href="https://www.carrismetropolitana.pt/wp-content/uploads/2023/08/CM-CGT-20230807.pdf" target="_blank">
					{t('general_conditions')}
				</a>
				<a href="https://www.carrismetropolitana.pt/politica-de-privacidade/" target="_blank">
					{t('privacy_policy')}
				</a>
				<a href="/legal/cookies" target="_blank">
					{t('cookies_policy')}
				</a>
				<a href="https://www.carrismetropolitana.pt/aviso-legal/" target="_blank">
					{t('legal_disclaimer')}
				</a>
			</div>
		</div>
	);

	//
}
