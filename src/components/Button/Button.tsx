type Props = {
	className?: string;
	type?: 'submit' | 'button';
	handleClick: () => void;
	disabled?: boolean;
	children: React.ReactNode;
};

const Button = ({
	className = '',
	type = 'button',
	handleClick,
	disabled = false,
	children,
}: Props) => {
	return (
		<button
			className={className}
			disabled={disabled}
			type={type}
			onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
