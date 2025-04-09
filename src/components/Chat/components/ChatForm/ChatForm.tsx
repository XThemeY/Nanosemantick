import { useState } from 'react';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { BotResponse } from '../../../../api/api';

type Props = {
	sendChatMessage: (message: string) => Promise<BotResponse | undefined>;
	loading: boolean;
};

const ChatForm = ({ sendChatMessage, loading }: Props) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const [inputValue, setInputValue] = useState('');
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSendMessage = async () => {
		const userMessage = inputValue.trim();

		if (!userMessage) return;

		const data = await sendChatMessage(userMessage);
		if (!data) {
			console.warn('Не удалось отправить сообщение');
			return;
		}
		console.log('botResponse', data.result.text.value);
		setInputValue('');
	};

	return (
		<div className='chat-form-container'>
			<form onSubmit={handleSubmit} className='chat-form'>
				<Input
					disabled={loading}
					className='chat-form-input'
					value={inputValue}
					handleChange={handleInputChange}
					placeholder='Введите сообщение'
				/>
				<Button
					disabled={loading}
					className='chat-form-button'
					type='submit'
					handleClick={handleSendMessage}>
					Отправить
				</Button>
			</form>
		</div>
	);
};

export default ChatForm;
