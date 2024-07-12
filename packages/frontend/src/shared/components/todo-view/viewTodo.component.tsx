import { Spinner, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
import * as React from 'react';
import Button from '~shared/components/button/button.component';
import { useNavigate } from 'react-router-dom';
import {
	buttonContainer,
	divDescription,
	divStyle,
	h1Style,
	loaderStyle,
	switchStyle,
} from './viewTodo.style';
import { useTodoSelectors } from '~store/todos.store';
import SwitchC from '../switches/switches.component';

const ViewTodoC = ({
	buttonStyles,
}: {
	buttonStyles: string;
}): React.ReactNode => {
	const { todo, loading } = useTodoSelectors();

	const navigate = useNavigate();

	if (loading) {
		return (
			<div className={classNames(loaderStyle)}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={classNames(divStyle)}>
			<h1 className={classNames(h1Style)}>{todo?.name}</h1>
			<h3>Author:</h3>
			<p>{todo?.authorEmail}</p>
			<h3>Description:</h3>
			<TextArea
				readOnly={true}
				large={true}
				className={classNames(divDescription)}
				value={todo?.description}
			/>
			<div className={classNames(switchStyle)}>
				<SwitchC todo={todo} />
			</div>
			<div className={classNames(buttonContainer)}>
				<Button
					onClick={() => navigate(-1)}
					extraButtonStyles={buttonStyles}
					text="Back"
					type="button"
				/>
			</div>
		</div>
	);
};

export default ViewTodoC;
