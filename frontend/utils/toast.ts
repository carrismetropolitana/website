/* eslint-disable @stylistic/no-mixed-spaces-and-tabs */
import { NotificationData, notifications } from '@mantine/notifications';

export interface ToastProps extends NotificationData {
	type?: 'error' | 'info' | 'success' | 'warning'
}

export interface ToastPromiseParams {
	error?: string
	pending?: string
	success?: string
}

class Toast {
	/**
	 * Hides all toasts
	*/
	clean() {
		notifications.clean();
	}

	/**
	 * Shows an error toast
	 * @param props - The toast props
	 */
	error(props: Omit<ToastProps, 'type'>): string {
		return this.show({
			...props,
			type: 'error',
		} as ToastProps);
	}

	/**
	 * Hides specific toast
	 * @param id - The toast id
	 */
	hide(id: string) {
		notifications.hide(id);
	}

	/**
	 * Shows an info toast
	 * @param props - The toast props
	 */
	info(props: Omit<ToastProps, 'type'>): string {
		return this.show({
			...props,
			type: 'info',
		} as ToastProps);
	}

	/**
	 * Shows a loading toast
	 * @param props - The toast props
	*/
	loading(props: Omit<ToastProps, 'loading' | 'type'>): string {
		return this.show({
			...props,
			loading: true,
			type: 'info',
		} as ToastProps);
	}

	/**
	 * Promise wrapper for toast
	 * @param promise - The promise to be wrapped
	 * @param statusMessages - The status messages for the promise
	*/
	promise<T>(promise: (() => Promise<T>) | Promise<T>, { error, pending, success }: ToastPromiseParams) {
		// If the promise is not a Promise instance, show the success message immediately
		if (!(promise instanceof Promise)) {
			this.success({
				message: success,
			});
		}

		const notifyPromise = typeof promise === 'function' ? promise() : promise;

		const id = this.loading({
			message: pending,
		});

		notifyPromise.then((result) => {
			console.log('result', result);
			this.update(id, {
				color: 'green',
				loading: false,
				message: success,
			});
			return result;
		}).catch((err) => {
			console.log('err', err);
			this.update(id, {
				color: 'red',
				loading: false,
				message: err.message,
				title: error,
			});
			return error;
		});
	}

	/**
	 * Shows a toast
	 * @param props - The toast props
	 */
	show(props: ToastProps): string {
		const color = props.color
		  || (props.type === 'error' && 'red')
		  || (props.type === 'info' && 'blue')
		  || (props.type === 'success' && 'green')
		  || (props.type === 'warning' && 'orange')
		  || undefined;

		return notifications.show({
			color: color,
			mt: 10,
			position: props.position || 'top-right',
			...props,
		});
	}

	/**
	 * Shows a success toast
	 * @param props - The toast props
	 */
	success(props: Omit<ToastProps, 'type'>): string {
		return this.show({
			...props,
			type: 'success',
		} as ToastProps);
	}

	/**
	 * Updates a toast given its id
	 * @param id - The toast id
	 * @param props - The toast props
	 */
	update(id: string, props: ToastProps) {
		notifications.update({
			id,
			...props,
		});
	}

	/**
	 * Shows a warning toast
	 * @param props - The toast props
	 */
	warning(props: Omit<ToastProps, 'type'>): string {
		return this.show({
			...props,
			type: 'warning',
		} as ToastProps);
	}
}

export default new Toast();
