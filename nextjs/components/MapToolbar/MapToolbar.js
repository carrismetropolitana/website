import styles from './MapToolbar.module.css';

export default function MapToolbar({ loading, error, title, rightSection, children }) {
	//

	return <div className={styles.container}>{children}</div>;
}