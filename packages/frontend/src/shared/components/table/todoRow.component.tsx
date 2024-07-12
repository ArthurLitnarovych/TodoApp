import * as React from 'react';
import { Cell } from '@table-library/react-table-library';
import { divActionStyle, newCell, tableButton } from './table.style';
import classNames from 'classnames';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoSelectors } from '~store/todos.store';
import { formatDate } from '~shared/utils/dateFormatter';
import SwitchC from '../switches/switches.component';
import { useAuthSelectors } from '~store/auth.store';
import { TodoType } from '~typings/todo.type';

const TodoRow = ({ item }: { item: TodoType }): React.ReactNode => {
	const { deleteT } = useTodoSelectors();
	const { email } = useAuthSelectors();

	const navigate = useNavigate();

	return (
		<>
			<Cell>{item?.name}</Cell>
			<Cell>{item?.description}</Cell>
			<Cell>{item?.isCompleted.toString()}</Cell>
			<Cell>{formatDate(item?.updatedAt)}</Cell>
			<Cell
				className={classNames(email === item?.authorEmail && newCell)}
			>
				{item?.name == '' ? (
					''
				) : (
					<div className={classNames(divActionStyle)}>
						{email === item?.authorEmail && <SwitchC todo={item} />}
						<Button
							extraButtonStyles={classNames(tableButton)}
							text={'View'}
							onClick={() =>
								navigate(`${ROUTER_KEYS.VIEW_TODO}/${item?.id}`)
							}
						/>
						{email === item?.authorEmail && (
							<>
								<Button
									extraButtonStyles={classNames(tableButton)}
									text={'Edit'}
									onClick={() =>
										navigate(
											`${ROUTER_KEYS.EDIT_TODO}/${item?.id}`,
										)
									}
								/>
								<Button
									extraButtonStyles={classNames(tableButton)}
									text={'Delete'}
									onClick={() => deleteT(item?.id)}
								/>
							</>
						)}
					</div>
				)}
			</Cell>
		</>
	);
};

export default TodoRow;
