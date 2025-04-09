import axios from 'axios';
import { throwApiError } from '../utils/utils';
import { ENVS } from '../utils/validateEnv';

const EVENTS = {
	READY: { name: 'ready', euid: '00b2fcbe-f27f-437b-a0d5-91072d840ed3' },
};

export type EVENTSType = keyof typeof EVENTS;

export enum ENDPOINTS {
	INIT = 'Chat.init',
	SENDMSG = 'Chat.request',
	EVENT = 'Chat.event',
}

export type BotResponse = {
	result: {
		cuid: string;
		text: {
			value: string;
		};
	};
};

const api = axios.create({
	baseURL: ENVS.BASE_API_URL,
});

export const init = async (cuid = ''): Promise<BotResponse> => {
	try {
		const response = await api.post<BotResponse>(ENDPOINTS.INIT, {
			uuid: import.meta.env.VITE_UUID,
			ciud: cuid,
		});
		return response.data;
	} catch (error) {
		return throwApiError(error);
	}
};

export const sendMessage = async (
	cuid: string,
	message = ''
): Promise<BotResponse> => {
	try {
		const response = await api.post<BotResponse>(ENDPOINTS.SENDMSG, {
			cuid: cuid,
			text: message,
		});

		return response.data;
	} catch (error) {
		return throwApiError(error);
	}
};

export const getEventResponse = async (
	cuid: string,
	event: keyof typeof EVENTS
): Promise<BotResponse> => {
	try {
		const response = await api.post<BotResponse>(ENDPOINTS.EVENT, {
			cuid: cuid,
			euid: EVENTS[event].euid,
		});
		return response.data;
	} catch (error) {
		return throwApiError(error);
	}
};
