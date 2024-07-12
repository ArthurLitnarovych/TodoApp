import Joi from 'joi';
import { Regex } from './regex.util';

const validationSchemas = {
	todos: Joi.object({
		name: Joi.string().trim().min(2).max(30).required(),
		description: Joi.string().trim().trim().max(1000).required(),
		isCompleted: Joi.boolean(),
		isPrivate: Joi.boolean(),
	}),
	usersRegister: Joi.object({
		email: Joi.string().regex(Regex.email).required(),
		name: Joi.string().trim().min(2).max(30).required(),
		password: Joi.string().regex(Regex.password).required(),
	}),
	usersLogin: Joi.object({
		email: Joi.string().regex(Regex.email).required(),
		password: Joi.string().regex(Regex.password).required(),
	}),
	emailVerification: Joi.object({
		email: Joi.string().regex(Regex.email).required(),
	}),
	passwordVerification: Joi.object({
		password: Joi.string().regex(Regex.password).required(),
	}),
};

export default validationSchemas;
