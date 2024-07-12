import { MaybeElement } from '@blueprintjs/core';
import { FormikHandlers } from 'formik';

export interface MyComponentProps {
	handleChange?: FormikHandlers['handleChange'];
	values?: string;
	name?: string;
	error?: string;
	labelFor?: string;
	labelInfo?: string;
	label?: string;
	icon?: MaybeElement;
	type?: 'password';
}
