import { openDB } from 'idb';
import { Message } from '../../components/Chat/components/MessageList';

// Имя базы данных и хранилища
const DB_NAME = 'chat-db';
const STORE_NAME = 'messages';

// Создаем или открываем базу данных
const dbPromise = openDB(DB_NAME, 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains(STORE_NAME)) {
			const store = db.createObjectStore(STORE_NAME, {
				keyPath: 'id',
				autoIncrement: true,
			});
			store.createIndex('timestamp', 'timestamp', { unique: false });
		}
	},
});

// Добавление сообщения в базу данных
export const saveMessageToDB = async (message: Message) => {
	const db = await dbPromise;
	await db.put(STORE_NAME, message);
};

// Получение всех сообщений из базы данных
export const getAllMessagesFromDB = async (): Promise<Message[]> => {
	const db = await dbPromise;
	const messages = await db.getAll(STORE_NAME);

	messages.sort((a, b) => a.timestamp - b.timestamp);

	return Promise.resolve(messages);
};

// Очистка всех сообщений
export const clearMessagesFromDB = async () => {
	const db = await dbPromise;
	await db.clear(STORE_NAME);
};
