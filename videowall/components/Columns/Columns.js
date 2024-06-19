/* * */

import styles from './Columns.module.css';

/* * */

export default function Columns({ cols = 2, style = {}, children }) {
  return (
    <div className={`${styles.container} ${cols && styles[`cols${cols}`]}`} style={style}>
      {children}
    </div>
  );
}
