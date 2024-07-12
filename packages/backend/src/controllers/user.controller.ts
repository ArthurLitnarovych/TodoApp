import { Response, Request, NextFunction } from 'express';
import { TryCatch } from '@/utils/tryCatch';
import UserService from '@/services/user.service';
import bcrypt from 'bcrypt';
import { verifyEmail } from '../utils/email/emailVerification/emailVerification';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { io } from '@/app';

export class UserController {
	constructor(private userService: UserService) {}

	@TryCatch
	async register(req: Request, res: Response): Promise<void> {
		const { email, password, name } = req.body;
		const existingUser = await this.userService.findByEmail(email);

		if (existingUser)
			throw new Error('User with this email already exists');

		const hashedPassword = bcrypt.hashSync(password, 8);

		const token = jwt.sign(
			{ email, name, hashedPassword },
			process.env.SECRET ?? 'secret',
			{
				expiresIn: '10d',
			},
		);

		const subject = 'Email verification';

		const emailText = `Greetings ${name}! You have recently visited our website and entered your email.
		Please follow the given link to verify your email:
		\n${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/user/verifyEmail/${token}
		\nThanks`;

		verifyEmail(email, emailText, subject);

		res.status(200).json({ message: 'Verification email sent' });
	}

	@TryCatch
	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;
		const user = await this.userService.findByEmail(email);

		if (!user) throw new Error("User with this email doesn't exist");

		const isPass = bcrypt.compareSync(password, user.password);

		if (!isPass) throw new Error('Incorrect password');

		const token = jwt.sign({ email }, process.env.SECRET ?? 'secret', {
			expiresIn: '10d',
		});

		res.status(200).json({ token, email });
	}

	@TryCatch
	async emailVerification(req: Request, res: Response): Promise<void> {
		const { token } = req.params;

		jwt.verify(
			token,
			process.env.SECRET ?? 'secret',
			async (err, decoded) => {
				if (err) {
					return res.redirect(`${process.env.CLIENT_URL}/`);
				}

				let email: string | undefined;
				let name: string | undefined;
				let hashedPassword: string | undefined;

				if (decoded && typeof decoded !== 'string') {
					const payload = decoded as JwtPayload;
					email = payload.email;
					name = payload.name;
					hashedPassword = payload.hashedPassword;
				}

				if (!email || !name || !hashedPassword) {
					return res
						.status(400)
						.json({ error: 'Data not found in token' });
				}

				const user = await this.userService.findByEmail(email);
				if (user) return res.redirect(`${process.env.CLIENT_URL}/`);

				await this.userService.create({
					email,
					name,
					password: hashedPassword,
				});

				io.timeout(2000).emit(`user-${email}`, { token, email });

				res.redirect(`${process.env.CLIENT_URL}/register`);
			},
		);
	}

	@TryCatch
	async sendPasswordChange(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const user = await this.userService.findByEmail(email);

		if (!user) throw new Error("User with this email doesn't exist");

		const token = jwt.sign(
			{ email },
			process.env.PASSWORD_SECRET ?? 'secretPassword',
			{
				expiresIn: '10m',
			},
		);

		const subject = 'Password change request';

		const emailText = `Greetings ${user.name}!
		Please follow the given link to change your password:
		\n${process.env.CLIENT_URL}/changePassword/${token}
		\nThanks`;

		verifyEmail(email, emailText, subject);

		res.status(200).json({
			message: 'Password change request sent to email',
		});
	}

	@TryCatch
	async passwordChangeVerification(
		req: Request,
		res: Response,
	): Promise<void> {
		const { token } = req.params;
		const { password } = req.body;

		jwt.verify(
			token,
			process.env.PASSWORD_SECRET ?? 'secretPassword',
			async (err, decoded) => {
				if (err) {
					return res.status(400).json({ error: 'Invalid token' });
				}

				let email: string | undefined;

				if (decoded && typeof decoded != 'string') {
					const payload = decoded as JwtPayload;
					email = payload.email;
				}

				if (!email) {
					return res
						.status(400)
						.json({ error: 'Email not found in token' });
				}

				const user = await this.userService.findByEmail(email);

				if (!user)
					return res
						.status(400)
						.json({ error: "User with this email doesn't exist" });

				if (bcrypt.compareSync(password, user.password))
					return res
						.status(400)
						.json({ error: 'Passwords are identical' });

				const hashedPassword = bcrypt.hashSync(password, 8);

				await this.userService.changePassword(email, hashedPassword);
				return res
					.status(200)
					.json({ message: 'Password changed successfully' });
			},
		);
	}
}

const userController = new UserController(new UserService());
export default userController;
