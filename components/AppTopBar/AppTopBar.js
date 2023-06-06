import styles from './AppTopBar.module.css';

export default function AppTopBar() {
  //

  const AppTopBarLink = ({ href, label, active }) => (
    <a href={href} className={`${styles.link} ${active && styles.active}`}>
      <div className={styles.çabel}>{label}</div>
      <div className={styles.indicatorWrapper}>
        <div className={styles.indicatorActive} />
      </div>
    </a>
  );

  return (
    <div className={styles.container}>
      <AppTopBarLink href='//www.tmlmobilidade.pt/' label='TML' />
      <AppTopBarLink href='//www.carrismetropolitana.pt/' label='Carris Metropolitana' active />
      <AppTopBarLink href='//www.navegante.pt/' label='navegante®' />
    </div>
  );
}
