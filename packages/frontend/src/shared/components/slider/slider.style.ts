import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const divSliderStyle = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: ${SPACES.sm};
	width: 90vw;
`;

export const sliderStyle = css`
	max-width: 100%;
	padding-bottom: ${SPACES.md};
`;

export const loaderStyle = css`
	display: flex;
	margin-top: ${SPACES.lg};
	justifycontent: center;
	alignitems: center;
`;
