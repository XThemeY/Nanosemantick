import Button from '../Button/Button';
import ChatForm from './components/ChatForm/ChatForm';
import MessageList from './components/MessageList';
import { useChat } from '../../hooks/useChat';

const Chat = () => {
	const { messages, loading, error, resetChat, sendChatMessage } = useChat();

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='chat-container'>
			<div className='chat-controls'>
				<Button className='chat-reset-button' handleClick={resetChat}>
					X
				</Button>
			</div>
			<div className='chat-body'>
				{error ? (
					<div>Error: {error}</div>
				) : (
					<MessageList messages={messages} />
				)}
				<ChatForm loading={loading} sendChatMessage={sendChatMessage} />
			</div>
		</div>
	);
};

export default Chat;
