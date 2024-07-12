import { Switch } from '@blueprintjs/core';
import * as React from 'react';
import { useTodoSelectors } from '~store/todos.store';
import { TodoType } from '~typings/todo.type';

const SwitchC = ({ todo }: { todo: TodoType }): React.ReactNode => {
	const { complete, privatize } = useTodoSelectors();
	
	return (
		<div>
			<Switch
				name="isCompleted"
				defaultChecked={todo?.isCompleted}
				onChange={() => complete(todo?.id)}
				labelElement={<strong>Completed</strong>}
			/>
			<Switch
				name="isPrivate"
				defaultChecked={todo?.isPrivate}
				onChange={() => privatize(todo?.id)}
				labelElement={<strong>Private</strong>}
			/>
		</div>
	);
};

export default SwitchC;
