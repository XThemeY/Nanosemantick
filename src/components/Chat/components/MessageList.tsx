import { useRef, useEffect } from 'react';
import Message from './Message';

export type Message = {
	id: string;
	message: string;
	sender: 'user' | 'bot';
	timestamp: Date;
};

type Props = {
	messages: Message[];
};

const MessageList = ({ messages }: Props) => {
	const messageListRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (messageListRef.current) {
			const element = messageListRef.current;

			requestAnimationFrame(() => {
				element.scrollTop = element.scrollHeight;
			});
		}
	}, [messages]);

	return (
		<ul className='message-list' ref={messageListRef}>
			{messages.map((item) => (
				<Message {...item} key={item.id} />
			))}
		</ul>
	);
};

export default MessageList;
