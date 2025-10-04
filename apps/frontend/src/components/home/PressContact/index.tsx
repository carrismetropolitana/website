"use client"

import { Button, FileInput, Textarea, TextInput } from '@mantine/core';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

const SectionHeader = () => {
	const t = useTranslations('home.PressContact');
	return (
		<div className={styles.pressLabelSectionHeader}>
			<h1>{t('section_heading')}</h1>
		</div>
	);
};

export function PressContact() {
	const t = useTranslations('home.PressContact');

	// Form state
	const [formData, setFormData] = useState({
		email: '',
		message: '',
		name: '',
		organization: '',
		phone: '',
		subject: '',
		surname: '',
	});

	// Form errors state
	const [errors, setErrors] = useState({
		email: '',
		message: '',
		name: '',
		organization: '',
		phone: '',
		subject: '',
		surname: '',
	});

	// UI state
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Phone mask utility function
	const formatPhoneNumber = (value: string) => {
		// Remove all non-numeric characters
		const numbers = value.replace(/\D/g, '');
		
		// Apply mask based on length
		if (numbers.length <= 3) {
			return numbers;
		} else if (numbers.length <= 6) {
			return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
		} else if (numbers.length <= 9) {
			return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
		} else {
			return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
		}
	};

	// Handle input changes
	const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let value = e.target.value;
		
		// Apply phone mask if it's the phone field
		if (field === 'phone') {
			value = formatPhoneNumber(value);
		}
		
		setFormData(prev => ({ ...prev, [field]: value }));
		
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	// Validate individual field on blur
	const validateField = (field: string, value: string) => {
		let error = '';

		if (field === 'name' && !value.trim()) {
			error = t('errors.name_required');
		}
		else if (field === 'surname' && !value.trim()) {
			error = t('errors.surname_required');
		}
		else if (field === 'email') {
			if (!value.trim()) {
				error = t('errors.email_required');
			}
			else {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					error = t('errors.email_invalid');
				}
			}
		}
		else if (field === 'organization' && !value.trim()) {
			error = t('errors.organization_required');
		}
		else if (field === 'subject' && !value.trim()) {
			error = t('errors.subject_required');
		}
		else if (field === 'message' && !value.trim()) {
			error = t('errors.message_required');
		}
		else if (field === 'phone' && value.trim()) {
			// Remove spaces and check if it's a valid phone number (9 digits for Portuguese numbers)
			const phoneNumbers = value.replace(/\D/g, '');
			if (phoneNumbers.length < 9) {
				error = t('errors.phone_invalid');
			}
		}

		setErrors(prev => ({ ...prev, [field]: error }));
		return error;
	};

	// Handle blur events
	const handleBlur = (field: string) => () => {
		validateField(field, formData[field]);
	};

	// Validate all fields
	const validateAllFields = () => {
		const newErrors = {
			email: validateField('email', formData.email),
			message: validateField('message', formData.message),
			name: validateField('name', formData.name),
			organization: validateField('organization', formData.organization),
			phone: validateField('phone', formData.phone),
			subject: validateField('subject', formData.subject),
			surname: validateField('surname', formData.surname),
		};

		setErrors(newErrors);

		// Return true if there are no errors
		return !Object.values(newErrors).some(error => error !== '');
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		const isValid = validateAllFields();
		if (!isValid) {
			toast.error({
				message: t('toast.validation_error_message'),
				title: t('toast.validation_error_title'),
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch('/admin/public-api/contact', {
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const data = await response.json();

			if (!response.ok || !data.success) {
				throw new Error(data.error || t('toast.error_generic'));
			}

			// Success!
			toast.success({
				message: t('toast.success_message'),
				title: t('toast.success_title'),
			});

			// Reset form
			setFormData({
				email: '',
				message: '',
				name: '',
				organization: '',
				phone: '',
				subject: '',
				surname: '',
			});

			// Clear errors
			setErrors({
				email: '',
				message: '',
				name: '',
				organization: '',
				phone: '',
				subject: '',
				surname: '',
			});
		}
		catch (error) {
			toast.error({
				message: error instanceof Error ? error.message : t('toast.error_generic'),
				title: t('toast.error_title'),
			});
		}
		finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="press-contact-form" className={styles.container}>
			<SectionHeader />

			<form className={styles.formContainer} onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<TextInput
						className={styles.formInput}
						label={t('form.name')}
						withAsterisk
						size="md"
						value={formData.name}
						onChange={handleInputChange('name')}
						onBlur={handleBlur('name')}
						error={errors.name}
						disabled={isSubmitting}
					/>
					<TextInput
						className={styles.formInput}
						label={t('form.surname')}
						withAsterisk
						size="md"
						value={formData.surname}
						onChange={handleInputChange('surname')}
						onBlur={handleBlur('surname')}
						error={errors.surname}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.formRow}>
					<TextInput
						className={styles.formInput}
						label={t('form.email')}
						withAsterisk
						size="md"
						type="email"
						value={formData.email}
						onChange={handleInputChange('email')}
						onBlur={handleBlur('email')}
						error={errors.email}
						disabled={isSubmitting}
					/>
					<TextInput
						className={styles.formInput}
						label={t('form.phone')}
						size="md"
						type="tel"
						value={formData.phone}
						onChange={handleInputChange('phone')}
						onBlur={handleBlur('phone')}
						error={errors.phone}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<TextInput
						className={styles.formInput}
						label={t('form.organization')}
						withAsterisk
						size="md"
						value={formData.organization}
						onChange={handleInputChange('organization')}
						onBlur={handleBlur('organization')}
						error={errors.organization}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<TextInput
						className={styles.formInput}
						label={t('form.subject')}
						withAsterisk
						size="md"
						value={formData.subject}
						onChange={handleInputChange('subject')}
						onBlur={handleBlur('subject')}
						error={errors.subject}
						disabled={isSubmitting}
					/>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<Textarea
						className={styles.formInputTextarea}
						label={t('form.message')}
						withAsterisk
						size="md"
						minRows={4}
						value={formData.message}
						onChange={handleInputChange('message')}
						onBlur={handleBlur('message')}
						error={errors.message}
						disabled={isSubmitting}
					/>
				</div>

				<Button
					className={styles.formButton}
					size="compact-lg"
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					{isSubmitting ? t('form.sending') : t('form.send')}
				</Button>

			</form>
		</section>
	);
}
