/* * */

import type { CollectionConfig } from 'payload';

import { ADMINISTRATOR_ROLE, canManageUsers, EDITOR_ROLE, isAdmin } from '@/access/roles';

/* * */

export const Users: CollectionConfig = {

	access: {
		create: async ({ req }) => {
			if (canManageUsers({ req })) return true;
			if (req.user) return false;

			const existingUsers = await req.payload.find({
				collection: 'users',
				depth: 0,
				limit: 1,
				pagination: false,
			});

			return existingUsers.docs.length === 0;
		},
		delete: ({ req }) => canManageUsers({ req }),
		read: ({ req }) => {
			if (!req.user) return false;
			if (isAdmin(req.user)) return true;
			return { id: { equals: req.user.id } };
		},
		update: ({ req }) => {
			if (!req.user) return false;
			if (isAdmin(req.user)) return true;
			return { id: { equals: req.user.id } };
		},
	},

	admin: {
		hidden: ({ user }) => !isAdmin(user),
		useAsTitle: 'email',
	},

	auth: {
		useAPIKey: true,
	},

	fields: [
		{
			label: 'Name',
			name: 'name',
			type: 'text',
		},
		{
			access: {
				create: ({ req }) => canManageUsers({ req }),
				update: ({ req }) => canManageUsers({ req }),
			},
			defaultValue: EDITOR_ROLE,
			label: 'Role',
			name: 'role',
			options: [
				{ label: 'Administrator', value: ADMINISTRATOR_ROLE },
				{ label: 'Editor', value: EDITOR_ROLE },
			],
			required: true,
			saveToJWT: true,
			type: 'select',
		},
		{
			label: 'Email',
			name: 'email',
			type: 'text',
		},
	],

	hooks: {
		beforeChange: [
			async ({ data, operation, originalDoc, req }) => {
				if (!data) return data;

				const nextData = { ...data };
				const requesterIsAdmin = canManageUsers({ req });
				const isSystemMigration = Boolean(req.context?.skipUserRoleGuards);

				if (operation === 'create') {
					const role = requesterIsAdmin
						? (nextData.role ?? EDITOR_ROLE)
						: ADMINISTRATOR_ROLE;

					nextData.role = role;
					if (typeof nextData.enableAPIKey === 'undefined') {
						nextData.enableAPIKey = role === ADMINISTRATOR_ROLE;
					}

					return nextData;
				}

				if (!requesterIsAdmin && !isSystemMigration) {
					nextData.role = originalDoc?.role;
					nextData.enableAPIKey = originalDoc?.enableAPIKey;
					nextData.apiKey = originalDoc?.apiKey;
					return nextData;
				}

				const role = nextData.role ?? originalDoc?.role ?? EDITOR_ROLE;
				const roleChanged = role !== (originalDoc?.role ?? EDITOR_ROLE);
				if (roleChanged) {
					nextData.enableAPIKey = role === ADMINISTRATOR_ROLE;
					if (role !== ADMINISTRATOR_ROLE) {
						nextData.apiKey = null;
					}
				}

				return nextData;
			},
		],
	},

	slug: 'users',

};
