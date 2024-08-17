interface InputProps {
	label: string;
	placeholder: string;
}

export default function Input({ label, placeholder }: InputProps) {
	return (
		<div role="presentation" className="input">

			<label htmlFor={label}>

				{label.charAt(0).toUpperCase() + label.slice(1)}:
			</label>

			<input
				type="text"
				id={label}
				name={label}
				placeholder={placeholder} 
			/>

		</div>
	)
}
