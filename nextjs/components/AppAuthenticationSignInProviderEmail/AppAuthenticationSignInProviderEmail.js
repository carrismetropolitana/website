'use client';

/* * */

import { useForm, yupResolver } from '@mantine/form';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { useTranslations } from 'next-intl';
import { TextInput } from '@mantine/core';
import styles from './AppAuthenticationSignInProviderEmail.module.css';

/* * */

export default function AppAuthenticationSignInProviderEmail({ onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppAuthenticationSignInProviderEmail');

  //
  // B. Setup form

  const form = useForm({
    clearInputErrorOnChange: true,
    validate: yupResolver(SignInValidation),
    initialValues: SignInDefault,
  });

  //
  // C. Render components

  return (
    <form className={styles.container} onSubmit={form.onSubmit(() => onClick('email', { email: form.values.email }))}>
      <TextInput label={t('email.label')} placeholder={t('email.placeholder')} {...form.getInputProps('email')} />
      <button type="submit" className={styles.submitButton}>
        {t('submit.label')}
      </button>
    </form>
  );

  //
}
