import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}

export function envCheck() {
	const env = import.meta.env;

	if (!('VITE_UUID' in env) || !String(env.VITE_UUID).trim()) {
		throw new Error('VITE_UUID is not set');
	}
	if (!('VITE_BASE_API_URL' in env) || !String(env.VITE_BASE_API_URL).trim()) {
		throw new Error('VITE_BASE_API_URL is not set');
	}
	return true;
}

export function throwApiError(error: unknown) {
	if (error instanceof AxiosError) {
		return Promise.reject(error);
	}
	if (error instanceof Error) {
		return Promise.reject(error);
	}
	return Promise.reject(new Error('Unknown error'));
}
