import { Icon, InputGroup, Spinner, Switch, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
import * as React from 'react';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/inputs/input.component';
import { useFormik } from 'formik';
import { CREATE_SCHEMA } from './editTodo.consts';
import { useTodoSelectors } from '~store/todos.store';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import {
	buttonContainer,
	buttonStyle,
	divEditStyle,
	loaderStyle,
	profileContainerStyle,
	profileEditStyle,
	switcherStyle,
	textAreaStyle,
} from './editTodo.style';
import { useAuthSelectors } from '~store/auth.store';
import Logout from '~shared/components/logout/logout.component';

const EditTodo = (): React.ReactNode => {
	const { fetchTodo, todo, loading, editTodo } = useTodoSelectors();

	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		fetchTodo(id);
	}, [fetchTodo]);

	const formik = useFormik({
		initialValues: {
			name: todo?.name,
			description: todo?.description,
			isPrivate: todo?.isPrivate,
			isCompleted: todo?.isCompleted,
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			editTodo({
				...values,
				name: values.name ? values.name : todo.name,
				description: values.description ? values.description : 'empty',
				id: id,
			});
			navigate(ROUTER_KEYS.DASHBOARD);
		},
		validationSchema: CREATE_SCHEMA,
		validateOnChange: true,
	});

	if (loading) {
		return (
			<div className={classNames(loaderStyle)}>
				<Spinner />
			</div>
		);
	}

	return (
		<div>
			<div className={classNames(profileContainerStyle)}>
				<Logout />
			</div>
			<div className={classNames(divEditStyle)}>
				<form onSubmit={formik.handleSubmit}>
					<h1>Edit todo</h1>
					<Input
						labelFor="Title"
						label="Title"
						labelInfo="(required)"
						icon={<Icon icon="edit"></Icon>}
						name="name"
						error={formik.errors.name}
						handleChange={formik.handleChange}
						values={formik.values.name}
					/>
					<p>Description:</p>
					<TextArea
						onChange={formik.handleChange}
						value={formik.values.description}
						name="description"
						className={classNames(textAreaStyle)}
						large={true}
					/>
					{<p>{formik.errors.description}</p>}
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

export default EditTodo;
