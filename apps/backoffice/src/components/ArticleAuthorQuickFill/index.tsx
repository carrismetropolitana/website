'use client';
/* * */

import { useField } from '@payloadcms/ui';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface MediaValue {
	id?: string
}

interface ArticleAuthor {
	bio?: null | string
	expertAuthor?: boolean
	name?: null | string
	picture?: MediaValue | null | string
	role?: null | string
	social?: {
		email?: null | string
		linkedin?: null | string
		twitter?: null | string
	}
}

interface ArticleDoc {
	author?: ArticleAuthor
}

interface UserDoc {
	email?: null | string
	id: string
	name?: null | string
}

interface PayloadListResponse<T> {
	docs?: T[]
}

interface AuthorOption {
	author: ArticleAuthor
	label: string
	source: 'article' | 'user'
	value: string
}

/* * */

const getAuthorKey = (author: ArticleAuthor) => {
	const email = author.social?.email?.trim().toLocaleLowerCase('pt') ?? '';
	if (email) return `email:${email}`;

	const name = author.name?.trim().toLocaleLowerCase('pt') ?? '';
	const role = author.role?.trim().toLocaleLowerCase('pt') ?? '';
	return `name:${name}|role:${role}`;
};

const getAuthorLabel = (author: ArticleAuthor) => {
	const name = author.name?.trim();
	const role = author.role?.trim();
	if (name && role) return `${name} (${role})`;
	return name || role || 'Autor sem nome';
};

/* * */

export function ArticleAuthorQuickFill() {
	//

	//
	// A. Setup variables

	const pictureField = useField<string>({ path: 'author.picture', potentiallyStalePath: 'author.picture' });
	const nameField = useField<string>({ path: 'author.name', potentiallyStalePath: 'author.name' });
	const roleField = useField<string>({ path: 'author.role', potentiallyStalePath: 'author.role' });
	const bioField = useField<string>({ path: 'author.bio', potentiallyStalePath: 'author.bio' });
	const expertAuthorField = useField<boolean>({ path: 'author.expertAuthor', potentiallyStalePath: 'author.expertAuthor' });
	const linkedinField = useField<string>({ path: 'author.social.linkedin', potentiallyStalePath: 'author.social.linkedin' });
	const twitterField = useField<string>({ path: 'author.social.twitter', potentiallyStalePath: 'author.social.twitter' });
	const emailField = useField<string>({ path: 'author.social.email', potentiallyStalePath: 'author.social.email' });

	const [isLoading, setIsLoading] = useState(true);
	const [options, setOptions] = useState<AuthorOption[]>([]);
	const [selectedValue, setSelectedValue] = useState('');

	//
	// B. Fetch data

	useEffect(() => {
		let isMounted = true;

		const fetchOptions = async () => {
			setIsLoading(true);

			try {
				const [articlesResponse, usersResponse] = await Promise.all([
					fetch('/admin/api/articles?depth=1&limit=100&sort=-publishDate'),
					fetch('/admin/api/users?depth=0&limit=100&sort=name'),
				]);

				const articlesData = articlesResponse.ok
					? await articlesResponse.json() as PayloadListResponse<ArticleDoc>
					: { docs: [] };

				const usersData = usersResponse.ok
					? await usersResponse.json() as PayloadListResponse<UserDoc>
					: { docs: [] };

				const authorOptions = new Map<string, AuthorOption>();

				for (const article of articlesData.docs ?? []) {
					const author = article.author;
					if (!author?.name?.trim()) continue;

					const key = getAuthorKey(author);
					if (authorOptions.has(key)) continue;

					authorOptions.set(key, {
						author,
						label: getAuthorLabel(author),
						source: 'article',
						value: `article:${key}`,
					});
				}

				for (const user of usersData.docs ?? []) {
					const label = user.name?.trim() || user.email?.trim();
					if (!label) continue;

					authorOptions.set(`user:${user.id}`, {
						author: {
							name: label,
							social: {
								email: user.email,
							},
						},
						label,
						source: 'user',
						value: `user:${user.id}`,
					});
				}

				if (isMounted) {
					setOptions([...authorOptions.values()].sort((a, b) => a.label.localeCompare(b.label, 'pt')));
				}
			}
			catch {
				if (isMounted) setOptions([]);
			}
			finally {
				if (isMounted) setIsLoading(false);
			}
		};

		fetchOptions();

		return () => {
			isMounted = false;
		};
	}, []);

	//
	// C. Handle actions

	const applyAuthor = (optionValue: string) => {
		setSelectedValue(optionValue);

		const selectedOption = options.find(option => option.value === optionValue);
		if (!selectedOption) return;

		const { author } = selectedOption;
		const mediaId = typeof author.picture === 'string' ? author.picture : author.picture?.id;

		if (mediaId) pictureField.setValue(mediaId);
		if (author.name) nameField.setValue(author.name);
		if (author.role) roleField.setValue(author.role);
		if (typeof author.bio !== 'undefined') bioField.setValue(author.bio ?? '');
		if (typeof author.expertAuthor === 'boolean') expertAuthorField.setValue(author.expertAuthor);
		if (typeof author.social?.linkedin !== 'undefined') linkedinField.setValue(author.social.linkedin ?? '');
		if (typeof author.social?.twitter !== 'undefined') twitterField.setValue(author.social.twitter ?? '');
		if (typeof author.social?.email !== 'undefined') emailField.setValue(author.social.email ?? '');
	};

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor="article-author-quick-fill">Usar autor existente</label>
			<select
				className={styles.select}
				disabled={isLoading || options.length === 0}
				id="article-author-quick-fill"
				onChange={event => applyAuthor(event.target.value)}
				value={selectedValue}
			>
				<option value="">
					{isLoading ? 'A carregar autores...' : 'Selecionar autor'}
				</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label} - {option.source === 'user' ? 'Utilizador' : 'Artigo anterior'}
					</option>
				))}
			</select>
			<p className={styles.description}>
				Preenche os campos abaixo com autores usados anteriormente e utilizadores aos quais tem acesso.
			</p>
		</div>
	);

	//
}
