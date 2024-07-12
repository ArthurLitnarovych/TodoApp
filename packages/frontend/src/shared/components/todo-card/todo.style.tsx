import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const sliderStyle = css`
	max-width: 100%;
	padding-bottom: ${SPACES.md};
`;

export const divSlideStyle = css`
	display: flex;
	flex-direction: column;
	gap: ${SPACES.sm};
	position: relative;
	border: solid 2px;
	border-radius: 10px;
	box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.5);
	padding: ${SPACES.s} ${SPACES.sm};
	height: 290px;
	width: 240px;
	overflow: auto;
`;

export const pStyle = css`
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
`;

export const h1Style = css`
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
`;

export const tableButton = css`
	padding: ${SPACES.xs} ${SPACES.xs};
	font-size: ${FONT_SIZES.small};
	font-weight: ${WEIGHTS.bold};
`;

export const divButtonStyle = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: absolute;
	bottom: ${SPACES.xs};
	right: ${SPACES.xs};
`;

export const viewButton = css`
	display: flex;
	flex-direction: row;
	margin-left: 20px;
`;