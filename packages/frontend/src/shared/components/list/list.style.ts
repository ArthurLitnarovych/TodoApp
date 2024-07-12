import { css } from '@emotion/css';
import { SPACES } from '~shared/styles/spaces.const';

export const divSliderStyle = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: ${SPACES.md};
	width: 90vw;
	gap: ${SPACES.md};
	overflow: auto;
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
`;

export const loaderStyle = css`
	display: flex;
	margin-top: ${SPACES.lg};
	justifycontent: center;
	alignitems: center;
`;
