import * as Yup from 'yup';
import { Regex } from '~shared/utils/regex.util';

export const EMAIL_SCHEMA = Yup.object().shape({
	email: Yup.string().matches(Regex.email, 'Incorrect email!'),
});

export const PASSWORD_SCHEMA = Yup.object().shape({
	password: Yup.string().matches(Regex.password, 'Incorrect password!'),
});
