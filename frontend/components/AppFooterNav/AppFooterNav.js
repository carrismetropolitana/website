'use client';

import styles from './AppFooterNav.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AppFooterNav() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterNav');

  // F. Render Components

  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <div className={styles.contactsInfo}>
          <div className={styles.contactInfo}>
            <a className={styles.number} href="tel:+351210418800">
              {t('contacts.info_line.number')}
            </a>
            <p className={styles.legend}>{t('contacts.info_line.description')}</p>
            <p className={styles.disclaimer}>{t('contacts.info_line.disclaimer')}</p>
          </div>
          <div className={styles.contactInfo}>
            <a className={styles.number} href="tel:+351210410400">
              {t('contacts.help_line.number')}
            </a>
            <p className={styles.legend}>{t('contacts.help_line.description')}</p>
            <p className={styles.disclaimer}>{t('contacts.help_line.disclaimer')}</p>
          </div>

          <div className="footer-social">
            <a href="https://www.facebook.com/carrismetropolitana" target="_blank">
              <img src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/social-facebook.svg" width="24" height="auto" />
            </a>
            <a href="https://www.instagram.com/carrismetropolitana/" target="_blank">
              <img src="https://www.carrismetropolitana.pt/wp-content/themes/carrismetropolitana/images/social-instagram.svg" width="24" height="auto" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.sitemap}>
        <div className="footer-menu">
          <div className="menu-menu-header-container">
            <ul id="primary-menu" className="menu">
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-50">
                <a>Viajar</a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-45">
                    <a href="https://www.carrismetropolitana.pt/horarios/">Horários</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-880">
                    <a href="https://www.carrismetropolitana.pt/paragens/">Paragens</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1825">
                    <a href="https://www.carrismetropolitana.pt/planeador/">Planeador</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-51">
                <a>Comprar</a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-42">
                    <a href="https://www.carrismetropolitana.pt/cartoes/">Cartões</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-43">
                    <a href="https://www.carrismetropolitana.pt/descontos/">Descontos</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-304">
                    <a href="https://www.carrismetropolitana.pt/viagens-frequentes/">Viagens Frequentes</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-308">
                    <a href="https://www.carrismetropolitana.pt/viagens-ocasionais/">Viagens Ocasionais</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-313">
                    <a href="https://www.carrismetropolitana.pt/tarifarios/">Tarifários</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-52">
                <a>Informar</a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5547">
                    <a href="https://www.carrismetropolitana.pt/jmj/">Jornada Mundial da Juventude</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-44">
                    <a href="https://www.carrismetropolitana.pt/espacos-navegante/">Espaços navegante®</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-41">
                    <a href="https://www.carrismetropolitana.pt/apoio/">Apoio ao Passageiro</a>
                  </li>
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1737">
                    <a href="https://www.carrismetropolitana.pt/perguntas-frequentes/1530/">Perguntas Frequentes</a>
                  </li>
                  <li className="menu-item menu-item-type-post_type_archive menu-item-object-noticia menu-item-142">
                    <a href="https://www.carrismetropolitana.pt/noticias/">Notícias</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.corporate}>
        <div className="menu-corporate-container">
          <ul id="corporate-menu" className="menu">
            <li id="menu-item-397" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-397">
              <a href="https://www.carrismetropolitana.pt/carris-metropolitana/">Carris Metropolitana</a>
            </li>
            <li id="menu-item-846" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-846">
              <a target="_blank" rel="noopener" href="https://recrutamento.carrismetropolitana.pt/">
                Recrutamento
              </a>
            </li>
            <li id="menu-item-2276" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2276">
              <a href="https://www.carrismetropolitana.pt/opendata/">Dados Abertos</a>
            </li>
            <li id="menu-item-4512" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4512">
              <a href="https://status.carrismetropolitana.pt/">Status</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
