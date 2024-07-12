import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport(
	{
		host: 'smtp.ukr.net',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASS,
		},
	},
	{ from: `TodoApp <${process.env.EMAIL}>` },
);
