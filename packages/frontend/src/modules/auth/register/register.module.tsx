import * as React from 'react';
import classNames from 'classnames';
import Button from '~shared/components/button/button.component';
import {
	buttonDesktopStyle,
	buttonGroup,
	divStyle,
	formStyle,
	h1Register,
} from './register.style';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { INITIAL_VALUES, REGISTER_SCHEMA } from './register.consts';
import Input from '~shared/components/inputs/input.component';
import { Icon } from '@blueprintjs/core';
import { socketService } from '~shared/services/socket.service';
import { useAuthSelectors } from '~store/auth.store';

const Register = (): React.ReactNode => {
	const navigate = useNavigate();
	const { register, email, setToken, setEmail, registered } =
		useAuthSelectors();
	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values) => {
			const { email, password, name } = values;
			register({ email, password, name });
		},
		validationSchema: REGISTER_SCHEMA,
		validateOnChange: true,
	});

	React.useEffect(() => {
		const handleUserEvent = (data) => {
			setToken(data.token);
			setEmail(data.email);
		};

		socketService.on(`user-${email}`, handleUserEvent);

		return () => {
			socketService.off(`user-${email}`, handleUserEvent);
		};
	}, [email, setToken, setEmail]);

	return (
		<div className={classNames(divStyle)}>
			<form
				className={classNames(formStyle)}
				onSubmit={formik.handleSubmit}
			>
				<h1 className={classNames(h1Register)}>Register</h1>
				<Input
					labelFor="email"
					label="Email"
					labelInfo="(required)"
					icon={<Icon icon="envelope"></Icon>}
					error={formik.errors.email}
					name="email"
					handleChange={formik.handleChange}
					values={formik.values.email}
				/>
				<Input
					labelFor="name"
					label="Name"
					labelInfo="(required)"
					icon={<Icon icon="person"></Icon>}
					error={formik.errors.name}
					name="name"
					handleChange={formik.handleChange}
					values={formik.values.name}
				/>
				<Input
					type="password"
					labelFor="password"
					label="Password"
					labelInfo="(required)"
					icon={<Icon icon="lock"></Icon>}
					error={formik.errors.password}
					name="password"
					handleChange={formik.handleChange}
					values={formik.values.password}
				/>
				<Input
					type="password"
					labelFor="check-password-input"
					label="Confirm password"
					labelInfo="(required)"
					icon={<Icon icon="lock"></Icon>}
					error={formik.errors.checkPassword}
					name="checkPassword"
					handleChange={formik.handleChange}
					values={formik.values.checkPassword}
				/>
				<div className={classNames(buttonGroup)}>
					<Button
						text="Back"
						type="button"
						extraButtonStyles={classNames(buttonDesktopStyle)}
						onClick={() => navigate('/')}
					/>
					<Button
						disabled={!registered}
						extraButtonStyles={classNames(buttonDesktopStyle)}
						text="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default Register;
