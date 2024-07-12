import { css } from '@emotion/css';
import { colors } from '~shared/styles/colors';
import { FONT_SIZES, WEIGHTS } from '~shared/styles/fonts.const';
import { SPACES } from '~shared/styles/spaces.const';

export const THEME = {
	Table: `
        --data-table-library_grid-template-columns:  15% 20% 18% 17% 30%;
    `,
	BaseCell: ` 
        &:not(:last-of-type) {
        border-right: 1px solid #a0a8ae;
        }
        min-height: 50px; 
    `,
	Cell: `
        min-height: 80px;
    `,
	HeaderRow: `
        background-color: ${colors.grey};
        .th {
            border-bottom: 1px solid #a0a8ae;
        }
    `,
	Row: `
        &:nth-of-type(odd) {
            background-color: ${colors.lightBlue};
        }

        &:nth-of-type(even) {
            background-color: ${colors.white};
        }
    `,
};

export const loaderStyle = css`
	display: flex;
	margin-top: ${SPACES.lg};
	justifycontent: center;
	alignitems: center;
`;

export const divTableStyle = css`
	width: 80%;
	margin: ${SPACES.sm};
	height: 800px;
`;

export const tableButton = css`
	padding: ${SPACES.xs} ${SPACES.xs};
	font-size: ${FONT_SIZES.small};
	font-weight: ${WEIGHTS.bold};
`;

export const divActionStyle = css`
	margin: ${SPACES.m} ${SPACES.m};
`;

export const newCell = css`
	height: 135px;
`;

export const paginationStyle = css`
	display: flex;
	padding: ${SPACES.s};
`;
