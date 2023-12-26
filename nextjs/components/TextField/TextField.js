'use client';

/* * */

import { useEffect, useState } from 'react';
import styles from './TextField.module.css';
import generator from '@/services/generator';

/* * */

export default function TextField({ type = 'text', name, label, description, placeholder, error, ...props }) {
  //

  //
  // A. Setup variables

  const [textFieldId, setTextFieldId] = useState(name || generator(3));

  //
  // B. Transform data

  //   useEffect(() => {
  //     setTextFieldId(name || generator(3));
  //   }, []);

  //
  // C. Render components

  return (
    <div className={`${styles.container} ${error && styles.isError}`}>
      <label htmlFor={textFieldId} className={styles.regularLabel}>
        {label}
      </label>
      <input type={type} name={textFieldId} placeholder={placeholder} className={styles.input} {...props} />
      {description && (
        <label htmlFor={textFieldId} className={styles.descriptionLabel}>
          {description}
        </label>
      )}
      {error && (
        <label htmlFor={textFieldId} className={styles.errorLabel}>
          {error}
        </label>
      )}
    </div>
  );

  //
}
