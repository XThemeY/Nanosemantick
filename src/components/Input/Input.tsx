type Props = {
	value: string;
	className?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	disabled?: boolean;
};

const Input = ({
	value = '',
	handleChange,
	className = '',
	placeholder = '',
	disabled = false,
}: Props) => {
	return (
		<input
			disabled={disabled}
			className={className}
			type='text'
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
		/>
	);
};

export default Input;
