import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const divStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
	height: 100vh;
`;

export const btnStyleApp = css`
	width: 120px;
	padding: ${SPACES.s} ${SPACES.s};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;

export const h1App = css`
	font-weight: ${WEIGHTS.bold};
	padding-bottom: ${SPACES.md};
`;
