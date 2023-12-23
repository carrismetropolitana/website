'use client';

/* * */

import { signIn } from 'next-auth/react';
import { Button, Space, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { useTranslations } from 'next-intl';
import styles from './AppAuthenticationSignIn.module.css';
import Text from '@/components/Text/Text';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';

/* * */

export default function AppAuthenticationSignIn() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppAuthenticationSignIn');
  const [isLoading, setIsLoading] = useState(false);

  //
  // B. Setup form

  const form = useForm({
    clearInputErrorOnChange: true,
    validate: yupResolver(SignInValidation),
    initialValues: SignInDefault,
  });

  //
  // C. Handle actions

  const handleSignIn = async () => {
    setIsLoading(true);
    signIn('email', { email: form.values.email, callbackUrl: '/' });
  };

  //
  // D. Render components

  return (
    <form onSubmit={form.onSubmit(handleSignIn)} className={styles.container}>
      <Text level="h2" text={t('title')} />
      <Text text={t('subtitle')} />
      <Space h={5} />
      <TextInput type="email" label={t('email.label')} placeholder={t('email.placeholder')} {...form.getInputProps('email')} />
      {!isLoading ? <Button type={'submit'} label={t('submit.label')} /> : <Loader visible />}
    </form>
  );
}
