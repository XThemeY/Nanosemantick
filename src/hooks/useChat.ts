import { useState, useEffect } from 'react';
import { EVENTSType, getEventResponse, init, sendMessage } from '../api/api';
import { Message } from '../components/Chat/components/MessageList';
import { nanoid } from 'nanoid';
import {
	clearMessagesFromDB,
	getAllMessagesFromDB,
	saveMessageToDB,
} from '../store/indexDB/indexDB';

export const useChat = () => {
	// Состояния
	const [cuid, setCuid] = useState<string>(
		() => localStorage.getItem('cuid') ?? ''
	); // Идентификатор чата
	const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
	const [error, setError] = useState<string | null>(null); // Ошибка
	const [messages, setMessages] = useState<Message[]>([]); // Сообщения

	// Инициализация чата
	const initializeChat = async () => {
		setLoading(true);
		try {
			// Загружаем сообщения из IndexedDB
			const storedMessages = await getAllMessagesFromDB();

			if (!storedMessages.length) {
				const response = await getEvent('READY');

				const newMessage: Message = {
					id: nanoid(),
					sender: 'bot',
					message: response?.result.text.value ?? '',
					timestamp: new Date(),
				};
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			} else {
				setMessages(storedMessages);
			}

			const response = await init(cuid);
			const newCuid = response.result.cuid;

			// Сохраняем cuid из ответа
			setCuid(newCuid);

			localStorage.setItem('cuid', newCuid);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Initialization failed');
			}

			console.error('Error during initialization:', err);
		} finally {
			setLoading(false);
		}
	};

	// Отправка сообщения
	const sendChatMessage = async (message: string) => {
		if (!cuid) {
			setError('Chat is not initialized');
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const response = await sendMessage(cuid, message);
			const newCuid = response.result.cuid;
			if (newCuid !== cuid) {
				setCuid(newCuid);
				localStorage.setItem('cuid', newCuid);
			}
			// Создаем новое сообщение
			const newMessage: Message = {
				id: nanoid(),
				sender: 'user',
				message: message,
				timestamp: new Date(),
			};

			// Обновляем состояние и сохраняем в IndexedDB
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			await saveMessageToDB(newMessage);

			const newBotMessage: Message = {
				id: nanoid(),
				sender: 'bot',
				message: response.result.text.value,
				timestamp: new Date(),
			};
			setMessages((prevMessages) => [...prevMessages, newBotMessage]); // Добавляем ответ в массив сообщений

			// Сохраняем сообщение в IndexedDB
			await saveMessageToDB(newBotMessage);
			return response;
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Failed to get message');
			}
			console.error('Error sending message:', err);
		} finally {
			setLoading(false);
		}
	};

	// Получение события
	const getEvent = async (event: EVENTSType) => {
		setLoading(true);
		setError(null);
		try {
			const response = await getEventResponse(cuid, event);
			const newCuid = response.result.cuid;

			const newMessage: Message = {
				id: nanoid(),
				sender: 'bot',
				message: response.result.text.value,
				timestamp: new Date(),
			};
			await saveMessageToDB(newMessage);
			if (newCuid !== cuid) {
				setCuid(newCuid);
				localStorage.setItem('cuid', newCuid);
			}
			return response;
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Failed to get event');
			}
			console.error('Error getting event:', err);
		} finally {
			setLoading(false);
		}
	};

	const resetChat = () => {
		localStorage.removeItem('cuid');
		clearMessagesFromDB();
		setCuid('');
		setMessages([]);
		initializeChat();
		console.log('Чат сброшен успешно');
	};

	// Очистка состояния при размонтировании компонента
	useEffect(() => {
		initializeChat();
		return () => {
			setCuid('');
			setMessages([]);
			setError(null);
		};
	}, []);

	// Возвращаем состояние и функции
	return {
		cuid,
		messages,
		loading,
		error,
		initializeChat,
		sendChatMessage,
		getEvent,
		resetChat,
	};
};
