'use client';

/* * */

import { SignInValidation } from '@/schemas/SignIn/validation';
import { useTranslations } from 'next-intl';
import { TextInput } from '@mantine/core';
import styles from './AppAuthenticationSignInProviderEmail.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

	const handleFormSubmit = async e => {
		try {
			e.preventDefault();
			SignInValidation.validateSync({ email: inputValue });
			onClick('email', { email: inputValue });
		} catch (error) {
			setInputError(error.message);
		}
	};

	//
	// C. Render components

	return (
		<form className={styles.container} onSubmit={handleFormSubmit}>
			<TextInput label={t('email.label')} placeholder={t('email.placeholder')} value={inputValue} onChange={handleTextInputChange} error={inputError} />
			<button type='submit' className={styles.submitButton}>
				{t('submit.label')}
			</button>
		</form>
	);

	//
}