export const ADMINISTRATOR_ROLE = 'administrator';
export const EDITOR_ROLE = 'editor';

export type UserRole = typeof ADMINISTRATOR_ROLE | typeof EDITOR_ROLE;

interface UserWithRole {
	id: number | string
	role?: null | string
}
interface WithUser {
	req: {
		user?: null | UserWithRole
	}
}

export const isAdmin = (user?: null | UserWithRole): boolean => user?.role === ADMINISTRATOR_ROLE;

export const isEditorOrAdmin = (user?: null | UserWithRole): boolean => Boolean(user && (user.role === ADMINISTRATOR_ROLE || user.role === EDITOR_ROLE));

export const isSelf = ({ id, req }: { id?: number | string, req: WithUser['req'] }): boolean => {
	if (!req.user) return false;
	if (typeof id === 'undefined' || id === null) return false;
	return String(req.user.id) === String(id);
};

export const canManageUsers = ({ req }: WithUser): boolean => isAdmin(req.user);

export const canReadOrEditSelfOrAdmin = ({ id, req }: { id?: number | string, req: WithUser['req'] }): boolean => isAdmin(req.user) || isSelf({ id, req });
