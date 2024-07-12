import userController from '@/controllers/user.controller';
import validator from '@/utils/validation/generic.validator';
import validationSchemas from '@/utils/validation/validation.schemas';
import { Router, Request, Response } from 'express';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	'/register',
	validator.isBodyValid.bind(validator)(validationSchemas.usersRegister),
	userController.register.bind(userController),
);
router.post(
	'/login',
	validator.isBodyValid.bind(validator)(validationSchemas.usersLogin),
	userController.login.bind(userController),
);
router.post(
	'/passwordChangeRequest',
	validator.isBodyValid.bind(validator)(validationSchemas.emailVerification),
	userController.sendPasswordChange.bind(userController),
);
router.post(
	'/changePassword/:token',
	validator.isBodyValid.bind(validator)(
		validationSchemas.passwordVerification,
	),
	userController.passwordChangeVerification.bind(userController),
);
router.get(
	'/verifyEmail/:token',
	userController.emailVerification.bind(userController),
);

export default router;
