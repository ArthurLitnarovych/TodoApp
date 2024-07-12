import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const divDashboardStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: ${SPACES.md};
`;

export const profileContainerStyle = css`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding-right: ${SPACES.md};
	padding-bottom: ${SPACES.m};
	gap: ${SPACES.s};
`;

export const profileDashboardStyle = css`
	padding: ${SPACES.m} ${SPACES.m};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;

export const loaderStyle = css`
	display: flex;
	margin-top: ${SPACES.lg};
	justifycontent: center;
	alignitems: center;
`;
