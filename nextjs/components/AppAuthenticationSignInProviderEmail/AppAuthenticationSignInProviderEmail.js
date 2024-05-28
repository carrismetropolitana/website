'use client';

/* * */

import { SignInValidation } from '@/schemas/SignIn/validation'
import { TextInput } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import styles from './AppAuthenticationSignInProviderEmail.module.css'

/* * */

export default function AppAuthenticationSignInProviderEmail({ onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppAuthenticationSignInProviderEmail');
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(null);

  //
  // C. Render components

  useEffect(() => {
    const urlHasEmailAddress = searchParams.get('email');
    if (urlHasEmailAddress) setInputValue(urlHasEmailAddress);
  }, [searchParams]);

  //
  // C. Handle actions

  const handleTextInputChange = ({ currentTarget }) => {
    setInputValue(currentTarget.value);
    setInputError(null);
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      SignInValidation.validateSync({ email: inputValue });
      onClick('email', { email: inputValue });
    }
 catch (error) {
      setInputError(error.message);
    }
  }

  //
  // C. Render components

  return (
    <form className={styles.container} onSubmit={handleFormSubmit}>
      <TextInput error={inputError} label={t('email.label')} onChange={handleTextInputChange} placeholder={t('email.placeholder')} value={inputValue} />
      <button className={styles.submitButton} type="submit">
        {t('submit.label')}
      </button>
    </form>
  )

  //
}
