import React from 'react'
import { Input, Textarea } from 'muicss/react'

export const FormInput = ({
	name,
	value,
	placeholder,
	label,
	textarea,
	floatingLabel
}) => {
	switch (textarea) {
		case true:
			return (
				<Textarea
					floatingLabel={floatingLabel}
					placeholder={placeholder}
					label={label}
					defaultValue={value}
				/>
			)
		default:
			return (
				<Input
					floatingLabel={floatingLabel}
					placeholder={placeholder}
					label={label}
					defaultValue={value}
					name={name}
				/>
			)
	}
}
