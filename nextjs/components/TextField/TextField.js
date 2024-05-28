'use client';

/* * */

import generator from '@/services/generator'
import { useEffect, useState } from 'react'

import styles from './TextField.module.css'

/* * */

export default function TextField({ description, error, label, name, placeholder, type = 'text', ...props }) {
  //

  //
  // A. Setup variables

  const [textFieldId, setTextFieldId] = useState(name || generator(3));

  //
  // B. Transform data

  //	 useEffect(() => {
  //		 setTextFieldId(name || generator(3));
  //	 }, []);

  //
  // C. Render components

  return (
    <div className={`${styles.container} ${error && styles.isError}`}>
      <label className={styles.regularLabel} htmlFor={textFieldId}>
        {label}
      </label>
      <input className={styles.input} name={textFieldId} placeholder={placeholder} type={type} {...props} />
      {description &&
				<label className={styles.descriptionLabel} htmlFor={textFieldId}>
  {description}
       </label>}
      {error &&
				<label className={styles.errorLabel} htmlFor={textFieldId}>
  {error}
       </label>}
    </div>
  )

  //
}
