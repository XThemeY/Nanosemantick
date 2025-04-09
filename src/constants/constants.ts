type EnvVariable = {
	name: string;
	required: boolean;
	defaultValue?: string;
};

export const requiredEnvVariables: EnvVariable[] = [
	{ name: 'VITE_BASE_API_URL', required: true },
	{ name: 'VITE_UUID', required: true },
];
