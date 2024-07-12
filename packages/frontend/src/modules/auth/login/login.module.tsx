import * as React from 'react';
import classNames from 'classnames';
import Button from '~shared/components/button/button.component';
import {
	buttonDesktopStyle,
	buttonGroup,
	divStyle,
	formStyle,
	h1Login,
} from './login.style';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { INITIAL_VALUES, LOGIN_SCHEMA } from './login.consts';
import Input from '~shared/components/inputs/input.component';
import { Icon } from '@blueprintjs/core';
import { useAuthSelectors } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';

const Login = (): React.ReactNode => {
	const { login, token } = useAuthSelectors();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values) => {
			login(values);
			token ?? navigate(ROUTER_KEYS.DASHBOARD);
		},
		validationSchema: LOGIN_SCHEMA,
		validateOnChange: true,
	});

	return (
		<div className={classNames(divStyle)}>
			<form
				className={classNames(formStyle)}
				onSubmit={formik.handleSubmit}
			>
				<h1 className={classNames(h1Login)}>Log in</h1>
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
				<div className={classNames(buttonGroup)}>
					<Button
						text="Back"
						type="button"
						extraButtonStyles={classNames(buttonDesktopStyle)}
						onClick={() => navigate('/')}
					/>
					<Button
						extraButtonStyles={classNames(buttonDesktopStyle)}
						disabled={!formik.dirty}
						text="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default Login;
