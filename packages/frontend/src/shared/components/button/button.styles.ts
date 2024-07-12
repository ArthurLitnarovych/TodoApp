import { css } from '@emotion/css';
import { colors } from '~shared/styles/colors';

export const btnStyles = (disabled: boolean, pressed: boolean): string => {
	return css`
		color: ${colors.black};
		background-color: ${disabled
			? colors.grey
			: pressed
				? colors.lightBlue
				: colors.white};
		border: 1;
		box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.5);
		text-align: center;
		transition: transform 0.2s ease-in-out;
		&:hover {
			transform: scale(1.1);
			cursor: pointer;
		}
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;

export const mr = css`
	margin-right: 15px;
`;
