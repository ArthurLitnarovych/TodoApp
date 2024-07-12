import { transporter } from '../mailer';

export const verifyEmail = (email: string, text: string, subject: string) => {
	const mailConfigurations = {
		to: email,
		subject,
		text,
	};

	transporter.sendMail(mailConfigurations, function (error, info) {
		if (error) throw Error(error.message);
	});
};
