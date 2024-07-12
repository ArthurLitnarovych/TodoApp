import * as React from 'react';
import classNames from 'classnames';
import Button from '~shared/components/button/button.component';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '~shared/components/inputs/input.component';
import { Icon } from '@blueprintjs/core';
import { useAuthSelectors } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';
import { PASSWORD_SCHEMA } from './restoration.consts';
import {
	buttonDesktopStyle,
	buttonGroup,
	divStyle,
	formStyle,
	h1Style,
} from './restoration.style';

const Password = (): React.ReactNode => {
	const navigate = useNavigate();

	const { changePassword } = useAuthSelectors();
	const { token } = useParams();
	const formik = useFormik({
		initialValues: { password: '' },
		onSubmit: (values) => {
			const { password } = values;
			changePassword(password, token);
			formik.errors ?? navigate(ROUTER_KEYS.APP);
		},
		validationSchema: PASSWORD_SCHEMA,
		validateOnChange: true,
	});

	return (
		<div className={classNames(divStyle)}>
			<form
				className={classNames(formStyle)}
				onSubmit={formik.handleSubmit}
			>
				<h1 className={classNames(h1Style)}>Password change</h1>
				<Input
					labelFor="password"
					label="Password"
					labelInfo="(required)"
					type="password"
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

export default Password;
