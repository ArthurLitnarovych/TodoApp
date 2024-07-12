import * as Yup from 'yup';
import { Regex } from '~shared/utils/regex.util';

export const INITIAL_VALUES = {
	email: '',
	password: '',
};

export const LOGIN_SCHEMA = Yup.object().shape({
	email: Yup.string().matches(Regex.email, 'Incorrect email!'),
	password: Yup.string().matches(Regex.password, 'Incorrect password!'),
});
