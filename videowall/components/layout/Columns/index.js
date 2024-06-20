/* * */

import styles from './styles.module.css';

/* * */

export default function Columns({ children, cols = 2, style = {} }) {
	return (
		<div className={`${styles.container} ${cols && styles[`cols${cols}`]}`} style={style}>
			{children}
		</div>
	);
}
