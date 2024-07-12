import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const h1Style = css`
	padding-bottom: ${SPACES.md};
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
`;

export const divStyle = css`
	width: 100%;
`;

export const divDescription = css`
	width: 100%;
	min-height: 300px;
`;

export const pStyle = css`
	padding-bottom: ${SPACES.sm};
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
`;

export const switchStyle = css`
	padding-top: ${SPACES.s};
`;

export const buttonContainer = css`
	padding: ${SPACES.s} 0 0 0;
`;

export const loaderStyle = css`
	display: flex;
	margin-top: ${SPACES.lg};
	justifycontent: center;
	alignitems: center;
`;
