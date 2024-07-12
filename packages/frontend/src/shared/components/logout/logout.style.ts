import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const profileStyle = css`
	padding: ${SPACES.m} ${SPACES.m};
	font-size: ${FONT_SIZES.medium};
	font-weight: ${WEIGHTS.bold};
`;
