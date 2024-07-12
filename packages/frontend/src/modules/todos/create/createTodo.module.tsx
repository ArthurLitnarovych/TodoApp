import { Icon, Switch, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
import * as React from 'react';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/inputs/input.component';
import {
	buttonContainer,
	buttonStyle,
	divCreateStyle,
	profileContainerStyle,
	switcherStyle,
	textAreaStyle,
} from './createTodo.style';
import { useFormik } from 'formik';
import { CREATE_SCHEMA, INITIAL_VALUES } from './createTodo.consts';
import { useTodoSelectors } from '~store/todos.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import Logout from '~shared/components/logout/logout.component';
import { toast } from 'react-toastify';

const CreateTodo = (): React.ReactNode => {
	const { addTodo } = useTodoSelectors();

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values) => {
			addTodo({
				...values,
				description: values.description ? values.description : 'empty',
			});
			navigate(ROUTER_KEYS.DASHBOARD);
		},
		validationSchema: CREATE_SCHEMA,
		validateOnChange: true,
	});
	return (
		<div>
			<div className={classNames(profileContainerStyle)}>
				<Logout />
			</div>
			<div className={classNames(divCreateStyle)}>
				<form onSubmit={formik.handleSubmit}>
					<h1>Add todo</h1>
					<Input
						labelFor="Title"
						label="Title"
						labelInfo="(required)"
						icon={<Icon icon="new-object"></Icon>}
						name="name"
						error={formik.errors.name}
						handleChange={formik.handleChange}
						values={formik.values.name}
					/>
					<p>Description:</p>
					<TextArea
						onChange={formik.handleChange}
						name="description"
						value={formik.values.description}
						className={classNames(textAreaStyle)}
						large={true}
					/>

					<div className={classNames(switcherStyle)}>
						<Switch
							name="isCompleted"
							onChange={formik.handleChange}
							checked={formik.values.isCompleted}
							labelElement={<strong>Completed</strong>}
						/>
						<Switch
							name="isPrivate"
							onChange={formik.handleChange}
							checked={formik.values.isPrivate}
							labelElement={<strong>Private</strong>}
						/>
					</div>

					<div className={classNames(buttonContainer)}>
						<Button
							extraButtonStyles={classNames(buttonStyle)}
							onClick={() => navigate(-1)}
							text="Back"
							type="button"
						/>
						<Button
							disabled={!formik.dirty}
							extraButtonStyles={classNames(buttonStyle)}
							text="Submit"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTodo;
