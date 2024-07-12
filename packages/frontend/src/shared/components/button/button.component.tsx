import * as React from 'react';
import classNames from 'classnames';

import { btnContentWrapper, btnStyles, iconWrapper, mr } from './button.styles';
import { Spinner } from '@blueprintjs/core';

type IButtonProps = {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	pressed?: boolean;
	extraButtonStyles?: string;
	icon?: React.ReactNode;
};

const Button: React.FunctionComponent<IButtonProps> = ({
	text,
	type = 'submit',
	onClick,
	loading,
	disabled,
	pressed,
	extraButtonStyles,
	icon,
}) => {
	const isDisabled = Boolean(loading ?? disabled);

	const handleClick = (): void => {
		if (isDisabled) {
			return;
		}

		onClick?.();
	};

	return (
		<button
			disabled={isDisabled}
			type={type}
			onClick={handleClick}
			className={classNames(
				btnStyles(Boolean(disabled), Boolean(pressed)),
				extraButtonStyles,
			)}
		>
			{Boolean(loading) ? (
				<Spinner />
			) : (
				<span className={btnContentWrapper}>
					{icon && (
						<span
							className={classNames(iconWrapper, {
								[mr]: Boolean(text),
							})}
						>
							{icon}
						</span>
					)}
					{text}
				</span>
			)}
		</button>
	);
};

export default Button;
