import * as Yup from 'yup';

export const INITIAL_VALUES = {
	name: '',
	description: '',
	isPrivate: false,
	isCompleted: false,
};

export const CREATE_SCHEMA = Yup.object().shape({
	name: Yup.string().min(2, 'Too short!').max(30, 'Too long!'),
	description: Yup.string().max(1000, 'Too long!'),
});
