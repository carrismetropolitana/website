/* * */

import styles from './Text.module.css';

/* * */

export default function Text({ variant = 'default', text = '', ...props }) {
  switch (variant) {
    //

    default:
    case 'default':
      return (
        <p className={`${styles.text} ${styles.default}`} {...props}>
          {text}
        </p>
      );

    case 'form_section_title':
      return (
        <p className={`${styles.text} ${styles.formSectionTitle}`} {...props}>
          {text}
        </p>
      );

    case 'form_section_description':
      return (
        <p className={`${styles.text} ${styles.formSectionDescription}`} {...props}>
          {text}
        </p>
      );

    case 'muted':
      return (
        <p className={`${styles.text} ${styles.muted}`} {...props}>
          {text}
        </p>
      );

    case 'error':
      return (
        <p className={`${styles.text} ${styles.error}`} {...props}>
          {text}
        </p>
      );

    //
  }
}
