'use client';

/* * */

import { GoBackButton } from '@/components/common/GoBackButton';
import { FormMainFields } from '@/components/form/FormMainFields';
import { FormMainValidateCode } from '@/components/form/FormMainValidateCode';
import Titles from '@/components/Titles/Titles';
import { getPrefilledForm, UpdateSchoolFormProvider, useUpdateSchoolForm } from '@/form/form';
import { updateSchoolFormSchema } from '@/form/schema';
import { notifications } from '@mantine/notifications';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// import { ModalSection } from '../ModalSection';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function FormMain({ schoolId }: Props) {
	//

	//
	// A. Setup variables

	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const form = useUpdateSchoolForm({
		mode: 'uncontrolled',
		validate: zod4Resolver(updateSchoolFormSchema),
	});

	//
	// B. Fetch data

	const { data: schoolData, isLoading: schoolLoading } = useSWR(`https://api.carrismetropolitana.pt/v2/facilities/schools/${schoolId}`);

	//
	// C. Handle actions

	useEffect(() => {
		if (!schoolData) return;
		const prefilledForm = getPrefilledForm(schoolData);
		form.initialize(prefilledForm);
	}, [schoolData]);

	const handleSubmitForm = async () => {
		// Get latest form values
		const formValues = form.getValues();
		// Submit the form data to the API
		const response = await fetch('/schools/api/submit', {
			body: JSON.stringify({ id: schoolData.id, ...formValues }),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		if (!response.ok || response.status !== 200) {
			notifications.show({ color: 'red', message: 'Por favor entre em contacto connosco para ajuda ao preenchimento. Agradecemos a sua colaboração.', title: 'A submissão contém erros e por isso não foi aceite.' });
			return;
		}
		const responseData = await response.json();
		if (responseData.error) {
			notifications.show({ color: 'red', message: 'Por favor entre em contacto connosco para ajuda ao preenchimento. Agradecemos a sua colaboração.', title: 'A submissão contém erros e por isso não foi aceite.' });
			return;
		}
		// Show success message or redirect
		notifications.show({
			color: 'green',
			message: 'Recebemos e guardámos a informação corretamente. Agradecemos a sua colaboração.',
			title: 'Formulário enviado com sucesso!',
		});
	};

	console.log(form.errors);

	//
	// D. Render components

	if (schoolLoading || !schoolData) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>

			<Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />

			<UpdateSchoolFormProvider form={form}>
				<form onSubmit={form.onSubmit(handleSubmitForm)}>
					{!isPasswordValid
						? <FormMainValidateCode onSubmit={setIsPasswordValid} />
						: <FormMainFields schoolId={schoolId} />}
				</form>
			</UpdateSchoolFormProvider>

			{/* <ModalSection setSuccessMessage={setSuccessMessage} successMessage={successMessage} /> */}

			<GoBackButton to="/portal-escolas" />

		</div>
	);

	//
}
