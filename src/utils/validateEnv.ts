import { requiredEnvVariables } from '../constants/constants';

type Envs = {
	UUID: string;
	BASE_API_URL: string;
};

export const validateEnv = (): void => {
	let isValid = true;

	for (const variable of requiredEnvVariables) {
		const value = import.meta.env[variable.name];

		if (variable.required && !value) {
			console.error(`Missing required environment variable: ${variable.name}`);
			isValid = false;
		} else if (!value && variable.defaultValue) {
			console.warn(
				`Environment variable ${variable.name} is missing. Using default value: ${variable.defaultValue}`
			);
			import.meta.env[variable.name] = variable.defaultValue;
		}
	}

	if (!isValid) {
		throw new Error(
			'Environment variables validation failed. Please check your .env file.'
		);
	}

	console.log('Environment variables validation passed.');
};

export const ENVS: Envs = (() => {
	const env = import.meta.env;

	return {
		UUID: env.VITE_UUID as string,
		BASE_API_URL: env.VITE_BASE_API_URL as string,
	};
})();
