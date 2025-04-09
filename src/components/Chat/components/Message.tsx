import { cn } from '../../../utils/utils';
import DOMPurify from 'dompurify';

type Props = {
	sender: 'user' | 'bot';
	message: string;
	timestamp: Date;
};

const Message = ({ sender, message, timestamp }: Props) => {
	const className =
		sender === 'user' ? 'chat-message--user' : 'chat-message--bot';
	const sanitizedMessage = DOMPurify.sanitize(message);
	return (
		<li className={cn('chat-item', className)}>
			<div className='chat-message'>
				<p
					className='message-text'
					dangerouslySetInnerHTML={{ __html: sanitizedMessage }}></p>
			</div>
			<span className='message-time'>
				{new Date(timestamp).toLocaleString()}
			</span>
		</li>
	);
};

export default Message;
