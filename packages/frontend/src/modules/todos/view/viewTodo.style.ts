import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const wrapStyle = css`
	width: 100vw;
	height: 120vh;
	background: ${colors.lightBlue};
`;

export const divStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: ${SPACES.sm};
	width: 100vw;
`;

export const divDesktopViewStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 420px;
	padding: ${SPACES.sm};
	border: solid;
	background: ${colors.white};
	box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.5);
`;

export const divMobileViewStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 0 ${SPACES.sm};
	padding: ${SPACES.sm};
	border: solid;
	background: ${colors.white};
	box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.5);
`;

export const profileViewStyle = css`
	padding: ${SPACES.m} ${SPACES.m};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;

export const profileViewMobileStyle = css`
	padding: ${SPACES.s} ${SPACES.s};
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

export const profileContainerMobileStyle = css`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: ${SPACES.md};
	gap: ${SPACES.s};
`;

export const buttonDesktopStyle = css`
	padding: ${SPACES.s} ${SPACES.md};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;

export const buttonMobileStyle = css`
	padding: ${SPACES.s} ${SPACES.s};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;
