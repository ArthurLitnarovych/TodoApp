import { css } from "@emotion/css";
import { colors } from "~shared/styles";
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const divStyle = css`
		display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
`;

export const formStyle = css`
		width: 320px;
`;

export const buttonGroup = css`
		display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
`;

export const h1Register = css`
		font-weight: ${WEIGHTS.bold};
        padding-bottom: ${SPACES.s};
`;

export const buttonDesktopStyle = css`
	padding: ${SPACES.s} ${SPACES.s};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;