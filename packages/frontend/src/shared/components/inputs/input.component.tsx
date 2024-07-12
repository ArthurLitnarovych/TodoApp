import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { MyComponentProps } from './input.consts';

const Input: React.FC<MyComponentProps> = ({
	handleChange,
	values,
	name,
	error,
	labelFor,
	labelInfo,
	label,
	icon,
	type,
}) => {
	return (
		<FormGroup
			label={label}
			labelFor={labelFor}
			labelInfo={' ' + labelInfo}
			helperText={error}
		>
			<InputGroup
				id={labelFor}
				leftIcon={icon}
				type={type}
				large={true}
				onChange={handleChange}
				value={values}
				name={name}
			/>
		</FormGroup>
	);
};

export default Input;
