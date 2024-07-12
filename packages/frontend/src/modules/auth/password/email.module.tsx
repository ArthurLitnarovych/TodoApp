import * as React from 'react';
import classNames from 'classnames';
import Button from '~shared/components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '~shared/components/inputs/input.component';
import { Icon } from '@blueprintjs/core';
import { useAuthSelectors } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';
import { EMAIL_SCHEMA } from './restoration.consts';
import {
	buttonDesktopStyle,
	buttonGroup,
	divStyle,
	formStyle,
	h1Style,
} from './restoration.style';

const Email = (): React.ReactNode => {
	const { sendPasswordChange } = useAuthSelectors();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: { email: '' },
		onSubmit: (values) => {
			const { email } = values;
			sendPasswordChange(email);
			formik.errors ?? navigate(ROUTER_KEYS.APP);
		},
		validationSchema: EMAIL_SCHEMA,
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
					labelFor="email"
					label="Email"
					labelInfo="(required)"
					icon={<Icon icon="envelope"></Icon>}
					error={formik.errors.email}
					name="email"
					handleChange={formik.handleChange}
					values={formik.values.email}
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

export default Email;
