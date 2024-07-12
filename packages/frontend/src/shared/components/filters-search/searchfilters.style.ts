import { css } from '@emotion/css';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const optionsContainerStyle = css`
	width: 80%;
	display: flex;
    flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding-top: ${SPACES.sm};
`;

export const optionsContainerTabletStyle = css`
	width: 80%;
	display: flex;
    flex-direction: row;
    gap: ${SPACES.m};
	justify-content: space-between;
	align-items: flex-start;
	padding-top: ${SPACES.sm};
`;

export const optionsContainerMobileStyle = css`
	width: 80%;
	display: flex;
    flex-direction: column;
    gap: ${SPACES.m};
	justify-content: center;
	align-items: center;
	padding-top: ${SPACES.sm};
`;

export const filterDashboardStyle = css`
	padding: ${SPACES.xs} ${SPACES.xs};
	font-size: ${FONT_SIZES.small};
	font-weight: ${WEIGHTS.bold};
`;
