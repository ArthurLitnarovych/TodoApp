import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const divCreateStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: ${SPACES.sm};
`;

export const profileCreateStyle = css`
	padding: ${SPACES.m} ${SPACES.m};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;

export const profileContainerStyle = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: ${SPACES.md};
	gap: ${SPACES.s};
`;

export const textAreaStyle = css`
	width: 300px;
	min-height: 400px;
`;

export const switcherStyle = css`
	padding-top: ${SPACES.s};
`;

export const buttonContainer = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const buttonStyle = css`
	padding: ${SPACES.m} ${SPACES.m};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;
