import * as Yup from 'yup';
import { Regex } from '~shared/utils/regex.util';

export const INITIAL_VALUES = {
	email: '',
	name: '',
	password: '',
	checkPassword: '',
};

export const REGISTER_SCHEMA = Yup.object().shape({
	email: Yup.string().matches(Regex.email, 'Incorrect email!'),
	name: Yup.string().min(2, 'Too short!').max(30, 'Too long!'),
	password: Yup.string().matches(Regex.password, 'Incorrect password!'),
	checkPassword: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match',
	),
});
